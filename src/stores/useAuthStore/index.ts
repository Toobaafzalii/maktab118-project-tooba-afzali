import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  user?: {
    accessToken: string;
    refreshToken: string;
    role: string;
    firstName: string;
    lastName: string;
  };
  setUser: (user: Required<Partial<AuthState["user"]>>) => void;
  clearUser: () => void;
}

const useAuthStore = create(
  persist<AuthState>(
    (set) => ({
      user: undefined,

      setUser: (user) => {
        set((state) => ({
          user,
        }));

        const updatedUser = {
          ...JSON.parse(localStorage.getItem("auth-user") || "{}"),
          ...user,
        };
        localStorage.setItem("auth-user", JSON.stringify(updatedUser));
      },
      clearUser: () => {
        set({
          user: undefined,
        });

        localStorage.removeItem("auth-user");
      },
    }),
    { name: "auth-user" }
  )
);

export default useAuthStore;
