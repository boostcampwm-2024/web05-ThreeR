import { create } from "zustand";

type AuthState = {
  role: "guest" | "user" | "admin";
  setRole: (role: "guest" | "user" | "admin") => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  role: "guest",
  setRole: (role) => set({ role }),
  logout: () => set({ role: "guest" }),
}));
