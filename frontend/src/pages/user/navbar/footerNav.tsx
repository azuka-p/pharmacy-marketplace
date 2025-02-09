import { House, MenuSquare, UserRound } from "lucide-react";
import { LogRegNav } from "./loginNav";
import useLoginStore from "@/store/useLoginStore";

export default function FooterNav() {
  const { isLogin } = useLoginStore();

  if (isLogin) {
    return (
      <>
        <div className="z-100 sticky bottom-0 flex justify-between border-t-2 bg-white px-5 py-2">
          <div className="grid grid-cols-1">
            <a href="/">
              <House className="flex w-full justify-center stroke-slate-500 stroke-1" />
              <p className="text-xs text-slate-500">Home</p>
            </a>
          </div>
          <div className="grid grid-cols-1">
            <a href="/order-history">
              <MenuSquare className="flex w-full justify-center stroke-slate-500 stroke-1" />
              <p className="text-xs text-slate-500">Orders</p>
            </a>
          </div>
          <div className="grid grid-cols-1">
            <a href="/profile">
              <UserRound className="flex w-full justify-center stroke-slate-500 stroke-1" />
              <p className="text-xs text-slate-500">Profile</p>
            </a>
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      <div className="z-100 sticky bottom-0 flex justify-between gap-6 border-t-2 bg-white px-5 py-2">
        <LogRegNav />
      </div>
    </>
  );
}
