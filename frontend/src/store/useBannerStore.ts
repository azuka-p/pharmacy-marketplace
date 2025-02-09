import { create } from "zustand";
import { persist } from "zustand/middleware";
type State = {
  show: boolean;
};

type Actions = {
  setShow: (newState: boolean) => void;
  reset: () => void;
};

const initialState: State = {
  show: true,
};

const useBannerStore = create<State & Actions, [["zustand/persist", unknown]]>(
  persist(
    (set) => ({
      ...initialState,
      setShow: (newState: boolean) => set(() => ({ show: newState })),
      reset: () => {
        set(initialState);
        localStorage.removeItem("banner-storage");
      },
    }),
    {
      name: "banner-storage",
    },
  ),
);

export default useBannerStore;
