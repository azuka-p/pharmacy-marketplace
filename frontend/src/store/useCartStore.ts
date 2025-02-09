import { create } from "zustand";
import { persist } from "zustand/middleware";
type State = {
  count: number;
};

//fetching backend
const initialState: State = {
  count: 0,
};

type Actions = {
  increment: (qty: number) => void;
  decrement: (qty: number) => void;
  deleteCart: (qty: number) => void;
  reset: () => void;
};

const useCartStore = create<State & Actions, [["zustand/persist", unknown]]>(
  persist(
    (set) => ({
      ...initialState,
      increment: (qty: number) => set((state) => ({ count: state.count + 1 })),
      decrement: (qty: number) => set((state) => ({ count: state.count - 1 })),
      deleteCart: (qty: number) =>
        set((state) => ({ count: state.count - qty })),
      reset: () => {
        set(initialState);
        localStorage.removeItem("cart-storage");
      },
    }),
    {
      name: "cart-storage",
    },
  ),
);

export default useCartStore;
