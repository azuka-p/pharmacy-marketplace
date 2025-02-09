import { Outlet } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import NotFoundPage from "@/pages/notFoundPage";
import useLoginStore from "@/store/useLoginStore";

function NonVerifiedLayout() {
  const { isLogin } = useLoginStore();

  if (!isLogin) {
    return (
      <>
        <NotFoundPage />
      </>
    );
  }

  return (
    <>
      <Outlet />
      <Toaster />
    </>
  );
}

export default NonVerifiedLayout;
