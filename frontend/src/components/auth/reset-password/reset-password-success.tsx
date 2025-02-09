import successIcon from "@/assets/icons/success-general-icon.svg";
import logo from "@/assets/icons/logo-medium.svg";

import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/toaster";

const ResetPasswordCardSuccessData = {
  title: "Reset Password Successfull",
  description: ["You can use your new password now!", "Please re-login"],
};

export default function ResetPasswordCardSuccess() {
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

        <Card className="border-top mx-auto max-w-5xl rounded-none shadow-xl">
          <img
            src={successIcon}
            width={"80px"}
            className="mx-auto mt-4"
            alt="reset password success icon"
          />
          <CardHeader className="">
            <CardTitle className="mx-auto p-2 text-2xl text-[#1A86C6]">
              {ResetPasswordCardSuccessData.title}
            </CardTitle>
            <CardDescription className="mx-auto p-8 text-center text-lg text-gray-700">
              <div className="flex flex-col gap-2">
                {ResetPasswordCardSuccessData.description.map((item, idx) => (
                  <p key={idx}>{item}</p>
                ))}
              </div>
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
      </div>
    </>
  );
}
