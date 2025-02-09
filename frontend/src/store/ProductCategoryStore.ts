import { adminProductCategoryResponse } from "@/models/adminProductCategoryResponse";
import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

interface productCategoryState {
  data: adminProductCategoryResponse[] | undefined;
  setData: (newState: adminProductCategoryResponse[] | undefined) => void;
  reset: () => void;
}

export const useCategoryStore = create<productCategoryState>()(
  devtools(
    persist(
      (set) => ({
        data: [],
        setData: (newState: adminProductCategoryResponse[] | undefined) =>
          set(() => ({ data: newState })),
        reset: () => {
          set(() => ({ data: [] }));
          localStorage.removeItem("product-category-store");
        },
      }),
      {
        name: "product-category-store",
      },
    ),
  ),
);
