import { create } from "zustand";
import { persist } from "zustand/middleware";
type State = {
  isLogin: boolean;
};

const initialState: State = {
  isLogin: false,
};

type Actions = {
  setIsLogin: (newState: boolean) => void;
  reset: () => void;
};

const useLoginStore = create<State & Actions, [["zustand/persist", unknown]]>(
  persist(
    (set) => ({
      ...initialState,
      setIsLogin: (newState: boolean) => set(() => ({ isLogin: newState })),
      reset: () => {
        set(initialState);
        localStorage.removeItem("login-storage");
      },
    }),

    {
      name: "login-storage",
    },
  ),
);

export default useLoginStore;
