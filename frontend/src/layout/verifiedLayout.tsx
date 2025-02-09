import { Outlet, useNavigate } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import NotFoundPage from "@/pages/notFoundPage";
import useLoginStore from "@/store/useLoginStore";
import { useEffect } from "react";
import { useDecodedJWTStore } from "@/store/useDecodedJWTStore";

function VerifiedLayout() {
  const navigate = useNavigate();
  const { isLogin } = useLoginStore();
  if (!isLogin) {
    return (
      <>
        <NotFoundPage />
      </>
    );
  }

  const { data } = useDecodedJWTStore();
  useEffect(() => {
    if (!data?.is_verified) {
      navigate("/");
    }
  }, [data, navigate]);

  return (
    <>
      <Outlet />
      <Toaster />
    </>
  );
}

export default VerifiedLayout;
