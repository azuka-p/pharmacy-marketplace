import { enableMapSet } from "immer";
enableMapSet();

import { create } from "zustand";
import { persist, StorageValue } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

export interface ProductCartType {
  id: number;
  count: number;
  price: number;
}

interface State {
  cartMap: Map<number, ProductCartType>;
  totalCount: number;
  totalPrice: number;
}

interface Actions {
  addToCart: (id: number) => void;
  increase: (id: number) => void;
  decrease: (id: number) => void;
  setImmediate: (id: number, value: number) => void;
  deleteCart: (id: number) => void;
  syncTotalCount: () => void;
  reset: () => void;
  setPrice: (ide: number, price: number) => void;
}

export const useProductCartStore = create<State & Actions>()(
  persist(
    immer((setItem, getItem) => ({
      cartMap: new Map<number, ProductCartType>(),
      totalCount: 0,
      totalPrice: 0,
      addToCart: (id: number) =>
        setItem((state) => {
          const data = getItem().cartMap;
          if (data.has(id)) {
            const prev = data.get(id);
            if (prev) {
              state.cartMap.set(id, {
                id: id,
                count: prev.count + 1,
                price: prev.price,
              });
            }
          } else {
            state.cartMap.set(id, { id: id, count: 1, price: 0 });
          }
        }),
      increase: (id: number) => {
        setItem((state) => {
          const data = getItem().cartMap;
          if (data.has(id)) {
            const prev = data.get(id);
            if (prev) {
              state.cartMap.set(id, {
                id: id,
                count: prev.count + 1,
                price: prev.price,
              });
            }
          }
        });
      },
      decrease: (id: number) =>
        setItem((state) => {
          const data = getItem().cartMap;
          if (data.has(id)) {
            const prev = data.get(id);
            if (prev) {
              if (prev.count === 1) {
                state.cartMap.delete(id);
              } else {
                state.cartMap.set(id, {
                  id: id,
                  count: prev.count - 1,
                  price: prev.price,
                });
              }
            }
          }
        }),
      setImmediate: (id: number, value: number) =>
        setItem((state) => {
          const prev = getItem().cartMap.get(id);
          if (prev) {
            if (value === 0) {
              state.cartMap.delete(id);
            } else {
              state.cartMap.set(id, {
                id: id,
                count: value,
                price: prev.price,
              });
            }
          }
        }),
      deleteCart: (id: number) =>
        setItem((state) => {
          state.cartMap.delete(id);
        }),
      syncTotalCount: () => {
        let sum = 0;
        let totalPrice = 0;
        getItem().cartMap.forEach((item) => {
          sum += item.count;
          if (item.price) {
            totalPrice += item.count * item.price;
          }
        });
        setItem(() => ({ totalCount: sum, totalPrice: totalPrice }));
      },
      reset: () => {
        setItem(() => ({ cartMap: new Map<number, ProductCartType>() }));
        setItem(() => ({ totalCount: 0 }));
        localStorage.removeItem("product-cart-store");
      },
      setPrice: (id: number, price: number) => {
        setItem((state) => {
          const cartItem = state.cartMap.get(id);
          if (cartItem) {
            state.cartMap.set(id, {
              id: id,
              count: cartItem.count,
              price: price,
            });
          }
        });
      },
    })),
    {
      name: "product-cart-store",
      storage: {
        getItem: (name) => {
          const str = localStorage.getItem(name);
          if (!str) return null;
          const existingValue = JSON.parse(str);
          return {
            ...existingValue,
            state: {
              ...existingValue.state,
              cartMap: new Map(existingValue.state.cartMap),
            },
          };
        },
        setItem: (name, newValue: StorageValue<State>) => {
          // functions cannot be JSON encoded
          const str = JSON.stringify({
            ...newValue,
            state: {
              ...newValue.state,
              cartMap: Array.from(newValue.state.cartMap.entries()),
            },
          });
          localStorage.setItem(name, str);
        },
        removeItem: (name) => localStorage.removeItem(name),
      },
    },
  ),
);
