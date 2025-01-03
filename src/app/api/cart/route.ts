import { NextRequest, NextResponse } from "next/server";
import { verify } from "jsonwebtoken";
import { connectToDatabase } from "../../../../lib/mangodb";

type CartItem = {
  id: string;
  quantity: number;
};

type Cart = {
  userId: string;
  cartItems: CartItem[];
};

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

const getUserIdFromAuthHeader = (req: NextRequest) => {
  const authHeader = req.headers.get("Authorization");
  if (!authHeader) return null;

  const token = authHeader.split(" ")[1];
  if (!token) return null;

  const decoded = verifyToken(token);
  // @ts-ignore
  return decoded?.id || null;
};

export async function GET(request: NextRequest) {
  const userId = getUserIdFromAuthHeader(request);

  if (!userId) {
    return NextResponse.json(
      { error: "Authentication required" },
      { status: 401 }
    );
  }

  const db = await connectToDatabase();
  const cartCollection = db.collection<Cart>("carts");

  const cart = await cartCollection.findOne({ userId });

  return NextResponse.json(cart?.cartItems || []);
}

export async function POST(request: NextRequest) {
  const userId = getUserIdFromAuthHeader(request);

  if (!userId) {
    return NextResponse.json(
      { error: "Authentication required" },
      { status: 401 }
    );
  }

  const newCartItems: CartItem[] = await request.json();

  if (!newCartItems || !Array.isArray(newCartItems)) {
    return NextResponse.json({ error: "Invalid cart data" }, { status: 400 });
  }

  const db = await connectToDatabase();
  const cartCollection = db.collection<Cart>("carts");

  const existingCart = await cartCollection.findOne({ userId });

  let updatedCartItems: CartItem[] = newCartItems;

  if (existingCart) {
    const existingItemsMap = new Map(
      existingCart.cartItems.map((item) => [item.id, item])
    );

    for (const newItem of newCartItems) {
      if (existingItemsMap.has(newItem.id)) {
        const existingItem = existingItemsMap.get(newItem.id);
        if (existingItem) {
          existingItem.quantity += newItem.quantity;
          existingItemsMap.set(newItem.id, existingItem);
        }
      } else {
        existingItemsMap.set(newItem.id, newItem);
      }
    }

    updatedCartItems = Array.from(existingItemsMap.values());
  }

  await cartCollection.updateOne(
    { userId },
    { $set: { cartItems: updatedCartItems } },
    { upsert: true }
  );

  const updatedCart = await cartCollection.findOne({ userId });

  return NextResponse.json({
    message: "Cart updated successfully",
    data: updatedCart,
  });
}

export async function DELETE(req: NextRequest) {
  const userId = getUserIdFromAuthHeader(req);

  if (!userId) {
    return NextResponse.json(
      { error: "Authentication required" },
      { status: 401 }
    );
  }

  const { itemId, deleteAll }: { itemId: string; deleteAll: boolean } =
    await req.json();

  if (!itemId && !deleteAll) {
    return NextResponse.json({ error: "Item ID is required" }, { status: 400 });
  }

  const db = await connectToDatabase();
  const cartCollection = db.collection<Cart>("carts");

  if (deleteAll) {
    await cartCollection.deleteMany({ userId });
  } else {
    await cartCollection.updateOne(
      { userId },
      { $pull: { cartItems: { id: itemId } } }
    );
  }

  return NextResponse.json({ message: "Item removed from cart" });
}

export async function PATCH(req: NextRequest) {
  const userId = getUserIdFromAuthHeader(req);

  if (!userId) {
    return NextResponse.json(
      { error: "Authentication required" },
      { status: 401 }
    );
  }

  const { itemId, quantity }: { itemId: string; quantity: number } =
    await req.json();

  if (!itemId || typeof quantity !== "number" || quantity < 0) {
    return NextResponse.json(
      { error: "Invalid item ID or quantity" },
      { status: 400 }
    );
  }

  const db = await connectToDatabase();
  const cartCollection = db.collection<Cart>("carts");

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
