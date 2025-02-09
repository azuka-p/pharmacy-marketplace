import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import logo from "@/assets/icons/logo-medium.svg";

import { Link, useNavigate } from "react-router-dom";
import LoadingSpinner from "@/components/reusables/loading-spinner/load";
import { useEffect, useState } from "react";
import { verifyRequest } from "@/models/verifyRequest";

const VerifyPageCard = {
  title: "Verify your email address",
  description:
    "Please confirm that you want to use this as your Pharmacy account email address. Once it's done you will be able to fully access the apps!",
  footer: "If you did not sign up for this account, you can ignore it.",
};

export default function VerifyPage() {
  const token = location.search.split("=")[1];
  if (token === undefined) {
    return <NotFoundPage />;
  }

  useDocumentTitle("Pharmacy | Verify Account");

  const { toast } = useToast();
  const [isVerified, setIsVerified] = useState(false);

  const cookies = new Cookies(null, { path: "/" });
  const domain = location.hostname;
  const { reset: resetCategoryStore } = useCategoryStore();
  const { reset: resetDecodedJWT } = useDecodedJWTStore();
  const { reset: resetLogin } = useLoginStore();
  const { reset: resetProfile } = useProfileStore();
  const { reset: resetCart } = useProductCartStore();

  const {
    error,
    isLoading,
    fetchData: respToken,
  } = useFetch<unknown, verifyRequest>("/auth/verify/token", {
    method: "POST",
  });

  const handleOnClickVerify = async () => {
    const req = {
      token: token,
    };
    const response = await respToken(req);
    if (response != undefined) {
      setIsVerified(true);
      // user must be logged out
      cookies.remove("access_token", { path: "/", domain: domain });
      resetCategoryStore();
      resetDecodedJWT();
      resetProfile();
      resetCart();
      resetLogin();
    }
  };

  useEffect(() => {
    if (error != undefined) {
      toast({
        variant: "destructive",
        title: "Something went wrong",
        description: error.error[0].message,
        className: "my-2",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    }
    if (isVerified) {
      toast({
        title: "Verification Success",
        description: "You are verified now!",
        className: "my-2",
      });
    }
  }, [error, isVerified, toast]);

  return (
    <>
      <div className="container mx-auto flex h-screen w-screen min-w-[550px] flex-1 flex-col gap-[25px]">
        <Toaster />
        <div className="pt-[50px]">
          <img
            src={logo}
            alt="pharmacy logo"
            width="225px"
            height="47px"
            className="mx-auto"
          />
        </div>
        {!isVerified ? (
          <VerificationCard
            isLoading={isLoading}
            handleOnClickVerify={handleOnClickVerify}
          />
        ) : (
          <VerificationSuccessCard />
        )}
      </div>
    </>
  );
}

interface VerificationCardProps {
  isLoading: boolean;
  handleOnClickVerify: () => void;
}

const VerificationCard = ({
  isLoading,
  handleOnClickVerify,
}: VerificationCardProps) => {
  return (
    <Card className="border-top mx-auto max-w-5xl rounded-none shadow-xl">
      <CardHeader className="">
        <CardTitle className="mx-auto p-2 text-2xl text-[#1A86C6]">
          {VerifyPageCard.title}
        </CardTitle>
        <CardDescription className="mx-auto p-8 text-center text-lg text-gray-700">
          {VerifyPageCard.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="mx-auto flex flex-1 flex-col">
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <Button
            className="mx-auto w-fit max-w-[1000px] bg-[#8FC641] py-6 text-xl shadow-md"
            onClick={handleOnClickVerify}
          >
            Verify my email
          </Button>
        )}
      </CardContent>
      <CardFooter>
        <p className="mx-auto border-t-2 p-4 text-base italic text-gray-500">
          {VerifyPageCard.footer}
        </p>
      </CardFooter>
    </Card>
  );
};

import verifiedIcon from "@/assets/icons/verified-icon.svg";
import useFetch from "@/hooks/useFetch";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { ToastAction } from "@radix-ui/react-toast";
import NotFoundPage from "../notFoundPage";
import useDocumentTitle from "@/hooks/useDocumentTitle";
import Cookies from "universal-cookie";
import { useCategoryStore } from "@/store/ProductCategoryStore";
import { useDecodedJWTStore } from "@/store/useDecodedJWTStore";
import useLoginStore from "@/store/useLoginStore";
import { useProfileStore } from "@/store/useProfileStore";
import { useProductCartStore } from "@/store/useProductCartStore";

const VerificationSuccessCardData = {
  title: "Email is Verified!",
  description:
    "Your email has been successfully verified. You can now access fully the apps!",
};

const VerificationSuccessCard = () => {
  return (
    <Card className="border-top mx-auto max-w-5xl rounded-none shadow-xl">
      <CardHeader className="">
        <CardTitle className="mx-auto p-2 text-2xl text-[#1A86C6]">
          {VerificationSuccessCardData.title}
        </CardTitle>
        <img src={verifiedIcon} width={"80px"} className="mx-auto" alt="" />
        <CardDescription className="mx-auto p-8 text-center text-lg text-gray-700">
          {VerificationSuccessCardData.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="mx-auto flex flex-1 flex-col">
        <Button
          asChild
          className="mx-auto w-fit max-w-[1000px] bg-[#8FC641] py-6 text-xl shadow-md"
        >
          <Link to={"/auth/login"} className="">
            Go to the App
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};
