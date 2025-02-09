import { Button } from "@/components/ui/button";
import useBannerStore from "@/store/useBannerStore";
import useLoginStore from "@/store/useLoginStore";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function VerifyBanner() {
  const setShow = useBannerStore((state) => state.setShow);
  const { isLogin } = useLoginStore();
  const navigate = useNavigate();
  if (isLogin) {
    return (
      <>
        <div className="flex justify-between bg-green-200 px-4 py-2">
          <X className="stroke-none" />
          <div className="flex items-center gap-2">
            <span>Verify your account to shop!</span>
            <Button variant={"link"} className="h-6 p-0 text-primBlue">
              <a href={"user/verify"}>verify here</a>
            </Button>
          </div>
          <X
            onClick={() => {
              setShow(false);
              navigate("/user/verify");
            }}
          />
        </div>
      </>
    );
  }
  return <></>;
}
