import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

export interface jwtDecodedType {
  id: number;
  role: number;
  is_verified: boolean;
  iss: string;
  exp: number;
  iat: number;
}

interface decodedJWTState {
  data: jwtDecodedType | undefined;
  setData: (newState: jwtDecodedType | undefined) => void;
  reset: () => void;
}

export const useDecodedJWTStore = create<decodedJWTState>()(
  devtools(
    persist(
      (set) => ({
        data: undefined,
        setData: (newState: jwtDecodedType | undefined) =>
          set(() => ({ data: newState })),
        reset: () => {
          set(() => ({ data: undefined }));
          localStorage.removeItem("decoded-jwt-store");
        },
      }),
      {
        name: "decoded-jwt-store",
      },
    ),
  ),
);
