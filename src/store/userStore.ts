import { create } from "zustand";

interface StoreState {
  role: string;
  setUSerRole: (role: string) => void;
}

const useUserStore = create<StoreState>()( (set) => ({
  role: '',
  setUSerRole: (role: string) => set({ role }),
}));

export default useUserStore;