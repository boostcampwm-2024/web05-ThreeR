import { create } from "zustand";

type TapState = {
  tap: "main" | "chart";
  setTap: (tap: "main" | "chart") => void;
};

export const useTapStore = create<TapState>((set) => ({
  tap: "main",
  setTap: (tap) => set({ tap }),
}));
