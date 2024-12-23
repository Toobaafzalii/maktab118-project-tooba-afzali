import { StateCreator, create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type CartItem = {
  id: string;
  quantity: number;
};

type CartStore = {
  cartItems: CartItem[];
  addItem: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
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
      clearCart: () => set({ cartItems: [] }),
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useCartStore;
