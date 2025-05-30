import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface IUser {
  id: string;
  district: string;
  role: string;
}

interface StoreState {
  user: IUser;
  setUser: (user: IUser) => void;
  clearUser: () => void;
}

const useUserStore = create<StoreState>()(
  
  persist(
    (set) => ({
      user: {
        id: "",
        district: "",
        role: ""
      },
      setUser: (user: IUser) => set({ user }),
      clearUser: () => set({ user: { id: "", district: "", role: "" } })
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ user: state.user }),
    }
  )
);

export default useUserStore;