import { create } from "zustand";

type TabStore = {
  currentTabInViewport: string | null;
  setCurrentTabInViewport: (tab: string) => void;
}

export const useTabStore = create<TabStore>((set) => ({
  currentTabInViewport: null,
  setCurrentTabInViewport: (tab) => set({ currentTabInViewport: tab }),
}));
