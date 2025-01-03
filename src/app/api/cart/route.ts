// app/api/route.js 👈🏽

import { NextRequest, NextResponse } from "next/server";
import { verify } from "jsonwebtoken"; // For JWT
import { connectToDatabase } from "../../../../lib/mangodb";

type CartItem = {
  id: string;
  quantity: number;
};

type Cart = {
  userId: string;
  cartItems: CartItem[];
};

// Helper function to verify JWT token
const verifyToken = (token: string) => {
  try {
    return verify(
      token,
      "c44715faa99ebc0970a03f15da0300da7936ddf09ebe7d9aa980bd4f5d5f6fcf"
    ) as { userId: string };
  } catch (error) {
    return null;
  }
};

// Function to extract the userId from the Authorization header
const getUserIdFromAuthHeader = (req: NextRequest) => {
  const authHeader = req.headers.get("Authorization");
  if (!authHeader) return null;

  const token = authHeader.split(" ")[1];
  // Expecting "Bearer <JWT>"
  if (!token) return null;

  const decoded = verifyToken(token);
  // @ts-ignore
  return decoded?.id || null;
};

// To handle a GET request to /api
export async function GET(request: NextRequest) {
  const userId = getUserIdFromAuthHeader(request); // Extract userId from token

  if (!userId) {
    return NextResponse.json(
      { error: "Authentication required" },
      { status: 401 }
    );
  }

  const db = await connectToDatabase();
  const cartCollection = db.collection<Cart>("carts");

  // Fetch cart from DB
  const cart = await cartCollection.findOne({ userId });

  return NextResponse.json(cart?.cartItems || []);
}

export async function POST(request: NextRequest) {
  const userId = getUserIdFromAuthHeader(request); // Extract userId from token

  if (!userId) {
    return NextResponse.json(
      { error: "Authentication required" },
      { status: 401 }
    );
  }

  const newCartItems: CartItem[] = await request.json(); // Parse cart items from body

  if (!newCartItems || !Array.isArray(newCartItems)) {
    return NextResponse.json({ error: "Invalid cart data" }, { status: 400 });
  }

  const db = await connectToDatabase();
  const cartCollection = db.collection<Cart>("carts");

  // Fetch the existing cart for the user
  const existingCart = await cartCollection.findOne({ userId });

  let updatedCartItems: CartItem[] = newCartItems;

  if (existingCart) {
    // Merge new items with existing items
    const existingItemsMap = new Map(
      existingCart.cartItems.map((item) => [item.id, item])
    );

    for (const newItem of newCartItems) {
      if (existingItemsMap.has(newItem.id)) {
        // Update quantity if item exists
        const existingItem = existingItemsMap.get(newItem.id);
        if (existingItem) {
          existingItem.quantity += newItem.quantity;
          existingItemsMap.set(newItem.id, existingItem);
        }
      } else {
        // Add new item
        existingItemsMap.set(newItem.id, newItem);
      }
    }

    // Convert the Map back to an array
    updatedCartItems = Array.from(existingItemsMap.values());
  }

  // Update the database with the merged cart
  await cartCollection.updateOne(
    { userId },
    { $set: { cartItems: updatedCartItems } },
    { upsert: true }
  );

  // Fetch the updated cart for the user
  const updatedCart = await cartCollection.findOne({ userId });

  return NextResponse.json({
    message: "Cart updated successfully",
    data: updatedCart,
  });
}

// Handle DELETE request to remove an item from the cart
export async function DELETE(req: NextRequest) {
  const userId = getUserIdFromAuthHeader(req); // Extract userId from token

  if (!userId) {
    return NextResponse.json(
      { error: "Authentication required" },
      { status: 401 }
    );
  }

  const { itemId, deleteAll }: { itemId: string; deleteAll: boolean } =
    await req.json(); // Parse item ID from body

  if (!itemId && !deleteAll) {
    return NextResponse.json({ error: "Item ID is required" }, { status: 400 });
  }

  const db = await connectToDatabase();
  const cartCollection = db.collection<Cart>("carts");

  if (deleteAll) {
    // Remove all items from the cart
    await cartCollection.deleteMany({ userId });
  } else {
    // Remove item from the cart
    await cartCollection.updateOne(
      { userId },
      { $pull: { cartItems: { id: itemId } } }
    );
  }

  return NextResponse.json({ message: "Item removed from cart" });
}

// Handle PATCH request to update the quantity of a specific cart item
export async function PATCH(req: NextRequest) {
  const userId = getUserIdFromAuthHeader(req); // Extract userId from token

  if (!userId) {
    return NextResponse.json(
      { error: "Authentication required" },
      { status: 401 }
    );
  }

  const { itemId, quantity }: { itemId: string; quantity: number } =
    await req.json(); // Parse item ID and quantity from body

  if (!itemId || typeof quantity !== "number" || quantity < 0) {
    return NextResponse.json(
      { error: "Invalid item ID or quantity" },
      { status: 400 }
    );
  }

  const db = await connectToDatabase();
  const cartCollection = db.collection<Cart>("carts");
  // Update the quantity of the specific item in the cart

  const result = await cartCollection.updateOne(
    { userId, "cartItems.id": itemId },
    { $set: { "cartItems.$.quantity": quantity } }
  );

  if (result.matchedCount === 0) {
    return NextResponse.json(
      { error: "Item not found in cart" },
      { status: 404 }
    );
  }

  return NextResponse.json({ message: "Item quantity updated successfully" });
}
