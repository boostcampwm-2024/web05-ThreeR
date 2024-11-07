import { create } from "zustand";

interface RegisterModalState {
  rssUrl: string;
  bloggerName: string;
  userName: string;
  email: string;
  setRssUrl: (url: string) => void;
  setBloggerName: (name: string) => void;
  setUserName: (name: string) => void;
  setEmail: (email: string) => void;
  resetInputs: () => void;
}

export const useRegisterModalStore = create<RegisterModalState>((set) => ({
  rssUrl: "",
  bloggerName: "",
  userName: "",
  email: "",
  setRssUrl: (url) => set({ rssUrl: url }),
  setBloggerName: (name) => set({ bloggerName: name }),
  setUserName: (name) => set({ userName: name }),
  setEmail: (email) => set({ email }),
  resetInputs: () => set({ rssUrl: "", bloggerName: "", userName: "", email: "" }),
}));
