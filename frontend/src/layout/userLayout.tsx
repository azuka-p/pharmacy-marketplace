import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import useLoginStore from "@/store/useLoginStore";
import { GetProfile } from "@/utils/getProfile";
import Cookies from "universal-cookie";

function UserLayout() {
  const cookies = new Cookies(null, { path: "/" });
  const ACCESS_TOKEN = cookies.get("access_token");

  const setIsLogin = useLoginStore((state) => state.setIsLogin);

  useEffect(() => {
    if (ACCESS_TOKEN) {
      setIsLogin(true);
    }
  }, [ACCESS_TOKEN, setIsLogin]);

  GetProfile();

  return (
    <>
      <Outlet />
      <Toaster />
    </>
  );
}

export default UserLayout;
