import { create } from "zustand";
import { persist } from "zustand/middleware";
type State = {
  id: number;
};

const initialState: State = {
  id: 0,
};

type Actions = {
  setID: (newState: number) => void;
};

const useCatIDStore = create<State & Actions, [["zustand/persist", unknown]]>(
  persist(
    (set) => ({
      ...initialState,
      setID: (newState: number) => set(() => ({ id: newState })),
    }),
    {
      name: "category-storage",
    },
  ),
);

export default useCatIDStore;
