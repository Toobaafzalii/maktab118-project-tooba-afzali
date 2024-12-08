import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  user: {
    accessToken: string | null;
    refreshToken: string | null;
    role: string | null;
    firstName: string | null;
    lastName: string | null;
  };
  setUser: (user: Partial<AuthState["user"]>) => void;
  clearUser: () => void;
}

const useAuthStore = create(
  persist<AuthState>(
    (set) => ({
      user: {
        accessToken: null,
        refreshToken: null,
        role: null,
        firstName: null,
        lastName: null,
      },
      setUser: (user) => {
        set((state) => ({
          user: {
            ...state.user,
            ...user,
          },
        }));

        const updatedUser = {
          ...JSON.parse(localStorage.getItem("auth-user") || "{}"),
          ...user,
        };
        localStorage.setItem("auth-user", JSON.stringify(updatedUser));
      },
      clearUser: () => {
        set({
          user: {
            accessToken: null,
            refreshToken: null,
            role: null,
            firstName: null,
            lastName: null,
          },
        });

        localStorage.removeItem("auth-user");
      },
    }),
    { name: "auth-user" }
  )
);

export default useAuthStore;
