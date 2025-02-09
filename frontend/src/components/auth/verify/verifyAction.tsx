import LoadingSpinner from "@/components/reusables/loading-spinner/load";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import useFetch from "@/hooks/useFetch";
import { useEffect, useState } from "react";
import LinkSent from "./linkSent";
import { ToastAction } from "@radix-ui/react-toast";
import TimerDown from "@/components/reusables/timerDown";

const COUNT_DOWN_VALUE = 300000; //5 min

const LOCALSTORAGE_NAME = "verify_layout";
interface storedVerifyActionLayout {
  is_next: boolean;
  is_timer_on: boolean;
}

const VerifyActionLayout = () => {
  const storedForgotPass: storedVerifyActionLayout = JSON.parse(
    localStorage.getItem(LOCALSTORAGE_NAME) || "{}",
  );

  const { toast } = useToast();
  const [isVerificationLinkGenerated, setIsVerificationLinkGenerated] =
    useState(false);
  const [next, setNext] = useState(
    storedForgotPass.is_next ? storedForgotPass.is_next : false,
  );
  const [isTimerOn, setIsTimerOn] = useState(
    storedForgotPass.is_timer_on ? storedForgotPass.is_timer_on : false,
  );

  const {
    error: errorVerify,
    isLoading,
    fetchData: respToken,
  } = useFetch<unknown>("/auth/verify", {
    method: "PATCH",
  });

  const handleButtonOnClick = async () => {
    const response = await respToken();
    if (response != undefined) {
      const prev: storedVerifyActionLayout = JSON.parse(
        localStorage.getItem(LOCALSTORAGE_NAME) || "{}",
      );
      setNext(true);
      setIsTimerOn(true);

      prev.is_next = true;
      prev.is_timer_on = true;
      localStorage.setItem(LOCALSTORAGE_NAME, JSON.stringify(prev));
    }
  };

  useEffect(() => {
    const prev: storedVerifyActionLayout = JSON.parse(
      localStorage.getItem(LOCALSTORAGE_NAME) || "{}",
    );
    if (!isTimerOn) {
      localStorage.removeItem(LOCALSTORAGE_NAME);
    } else {
      prev.is_next = next;
      prev.is_timer_on = isTimerOn;
      localStorage.setItem(LOCALSTORAGE_NAME, JSON.stringify(prev));
    }
  }, [next, isTimerOn]);

  useEffect(() => {
    if (errorVerify != undefined) {
      toast({
        variant: "destructive",
        title: "Something went wrong",
        description: errorVerify.error[0].message,
        className: "my-2",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    }
    if (isVerificationLinkGenerated) {
      toast({
        title: "Verification link has been sent",
        description: "Please check your email!",
        className: "my-2",
      });
      setIsVerificationLinkGenerated(false);
    }
  }, [errorVerify, isVerificationLinkGenerated]);

  return (
    <>
      {!next ? (
        <>
          <div className="flex items-center justify-center text-center text-sm">
            <p>
              To continue the verification process, Please click the button
              below
            </p>
          </div>
        </>
      ) : (
        <LinkSent />
      )}
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <Button
            onClick={handleButtonOnClick}
            type="button"
            className={
              isTimerOn
                ? "opacity-80{} text-l mt-3 rounded-lg bg-[#5f5f5f] p-6 text-white"
                : "opacity-80{} text-l mt-3 rounded-lg bg-[#8FC641] p-6 text-white"
            }
            disabled={isTimerOn}
          >
            {!next ? "Verify Now" : "Resend Verification"}
          </Button>
          {isTimerOn && (
            <div className="flex flex-row items-center justify-center gap-1">
              <p className="text-sm">resend will be available in</p>
              <TimerDown
                className="text-md"
                setIsTimerOn={setIsTimerOn}
                countDownValue={COUNT_DOWN_VALUE}
                localStorageName="verifyLayout"
              />
            </div>
          )}
        </>
      )}
    </>
  );
};

export default VerifyActionLayout;
