import { StateCreator, create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type CartItem = {
  id: string;
  quantity: number;
};

type CartStore = {
  cartItems: CartItem[];
  addItem: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  setItems:(items:CartItem[]) =>  void
};

const useCartStore = create(
  persist<CartStore>(
    (set) => ({
      cartItems: [],
      addItem: (id, quantity) =>
        set((state) => {
          const itemExists = state.cartItems.some((item) => item.id === id);
          if (itemExists) {
            return {
              cartItems: state.cartItems.map((item) =>
                item.id === id
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              ),
            };
          }
          return {
            cartItems: [...state.cartItems, { id, quantity }],
          };
        }),
      removeItem: (id) =>
        set((state) => ({
          cartItems: state.cartItems.filter((item) => item.id !== id),
        })),
      updateQuantity: (id, quantity) =>
        set((state) => ({
          cartItems: state.cartItems.map((item) =>
            item.id === id ? { ...item, quantity } : item
          ),
        })),
        setItems: (items) =>
          set((state) => ({
            cartItems:items,
          })),
      clearCart: () => set({ cartItems: [] }),
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useCartStore;


// import { create } from "zustand";
// import { createJSONStorage, persist } from "zustand/middleware";

// // Define types for the cart and cart item
// type CartItem = {
//   id: string;
//   quantity: number;
// };

// type CartStore = {
//   cartItems: CartItem[]; // List of items in the cart
//   userId: string | null;  // User's ID (null for guest users)
//   setUser: (userId: string) => void; // Set user when logged in
//   addItem: (id: string, quantity: number) => void;
//   removeItem: (id: string) => void;
//   updateQuantity: (id: string, quantity: number) => void;
//   clearCart: () => void;
//   syncCartWithServer: () => Promise<void>; // Sync cart with server (for logged-in users)
//   loadCartFromLocalStorage: () => void; // Load cart from localStorage (for guest users)
// };

// const useCartStore = create<CartStore>(
//   persist(
//     (set, get) => ({
//       cartItems: [],
//       userId: null, // Start with no user logged in
//       setUser: (userId) => set({ userId }), // Set the userId when logged in
//       addItem: (id, quantity) =>
//         set((state) => {
//           const itemExists = state.cartItems.some((item) => item.id === id);
//           if (itemExists) {
//             return {
//               cartItems: state.cartItems.map((item) =>
//                 item.id === id
//                   ? { ...item, quantity: item.quantity + quantity }
//                   : item
//               ),
//             };
//           }
//           return {
//             cartItems: [...state.cartItems, { id, quantity }],
//           };
//         }),
//       removeItem: (id) =>
//         set((state) => ({
//           cartItems: state.cartItems.filter((item) => item.id !== id),
//         })),
//       updateQuantity: (id, quantity) =>
//         set((state) => ({
//           cartItems: state.cartItems.map((item) =>
//             item.id === id ? { ...item, quantity } : item
//           ),
//         })),
//       clearCart: () => set({ cartItems: [] }),

//       // Sync the cart with the server when the user is logged in
//       syncCartWithServer: async () => {
//         const { userId, cartItems } = get();
//         if (userId) {
//           try {
//             const response = await fetch(`/api/cart`, {
//               method: 'POST',
//               headers: {
//                 'Content-Type': 'application/json',
//                 Authorization: `Bearer ${userId}`, // Use the JWT for auth
//               },
//               body: JSON.stringify(cartItems),
//             });

//             const data = await response.json();
//             if (response.ok) {
//               console.log("Cart synced with server:", data);
//             } else {
//               console.error("Failed to sync cart with server:", data);
//             }
//           } catch (error) {
//             console.error("Error syncing cart with server:", error);
//           }
//         }
//       },

//       // Load the cart from localStorage for guest users
//       loadCartFromLocalStorage: () => {
//         const localCart = localStorage.getItem('cart-storage');
//         if (localCart) {
//           set({ cartItems: JSON.parse(localCart) });
//         }
//       }
//     }),
//     {
//       name: 'cart-storage', // persist to localStorage
//       storage: createJSONStorage(() => localStorage),
//     }
//   )
// );

// export default useCartStore;
