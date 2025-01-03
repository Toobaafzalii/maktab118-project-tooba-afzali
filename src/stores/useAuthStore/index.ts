import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface AuthState {
  user?: {
    _id: string
    accessToken: string;
    refreshToken: string;
    role: string;
    firstName: string;
    lastName: string;
  };
  setUser: (user: Required<Partial<AuthState["user"]>>) => void;
  clearUser: () => void;
  isRehydrateStorage: boolean;
  setIsRehydrateStorage: () => void;
}

const useAuthStore = create(
  persist<AuthState>(
    (set) => ({
      user: undefined,
      setUser: (user) => {
        set(() => ({
          user,
        }));
      },
      clearUser: () => {
        set({
          user: undefined,
        });
      },
      isRehydrateStorage: false,
      setIsRehydrateStorage() {
        set({ isRehydrateStorage: true });
      },
    }),
    {
      name: "auth-user",
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: (state) => () => state.setIsRehydrateStorage(),
    }
  )
);

export default useAuthStore;
