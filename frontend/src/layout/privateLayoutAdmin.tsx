import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import Cookies from "universal-cookie";
import { useDecodedJWTStore } from "@/store/useDecodedJWTStore";
import NotFoundPage from "@/pages/notFoundPage";

function PrivateLayoutAdmin() {
  const navigate = useNavigate();
  const cookies = new Cookies(null, { path: "/" });
  const ACCESS_TOKEN = cookies.get("access_token");
  const jwt = useDecodedJWTStore();
  useEffect(() => {
    if (
      ACCESS_TOKEN == "" ||
      ACCESS_TOKEN == null ||
      ACCESS_TOKEN == undefined
    ) {
      navigate("/auth/login");
    }
  }, [ACCESS_TOKEN, navigate]);

  if (jwt.data?.role != 1) {
    return <NotFoundPage />;
  }

  return (
    <>
      <Outlet />
      <Toaster />
    </>
  );
}

export default PrivateLayoutAdmin;
