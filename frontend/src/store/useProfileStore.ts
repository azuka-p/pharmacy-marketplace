import { UserAddress } from "@/models/user/address";
import { UserProfile } from "@/models/user/profile";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface State {
  data: UserProfile | undefined;
}

interface Action {
  setData: (newState: UserProfile | undefined) => void;
  reset: () => void;
  getActiveAddress: () => UserAddress | undefined;
  setActiveAddressId: (addrId: number) => void;
  addAddress: (newAddr: UserAddress) => void;
  editAddress: (editedAddress: UserAddress) => void;
  deleteAddress: (addrId: number) => void;
}

const initialState: State = {
  data: {
    email: "",
    gender: false,
    id: 0,
    is_verified: false,
    name: "",
    profile_picture: "",
    address: [],
    activeAddressId: undefined,
  },
};

export const useProfileStore = create<
  State & Action,
  [["zustand/persist", unknown]]
>(
  persist(
    (set, get) => ({
      ...initialState,
      setData: (newState: UserProfile | undefined) =>
        set(() => ({ data: newState })),
      reset: () => {
        set(initialState);
        localStorage.removeItem("profile-storage");
      },
      getActiveAddress: () => {
        const activeAddressId = get().data?.activeAddressId;
        if (activeAddressId) {
          return get().data?.address.filter(
            (item) => item.id == activeAddressId,
          )[0];
        }
      },
      setActiveAddressId: (addrId: number) => {
        const newData = get().data;
        if (newData) newData.activeAddressId = addrId;
        set(() => ({
          data: newData,
        }));
      },
      addAddress: (newAddr: UserAddress) => {
        const data = get().data;
        if (data?.address) {
          data.address.push(newAddr);
          set(() => ({ data: data }));
        }
      },
      editAddress: (editedAddress: UserAddress) => {
        const data = get().data;
        if (data?.address) {
          data.address[
            data.address.findIndex((el) => el.id === editedAddress.id)
          ] = editedAddress;
          set(() => ({ data: data }));
        }
      },
      deleteAddress: (addrId: number) => {
        const data = get().data;
        if (data?.address) {
          data.address = data.address.filter((item) => {
            return item.id != addrId;
          });
          set(() => ({ data: data }));
        }
      },
    }),
    {
      name: "profile-storage",
    },
  ),
);
