import emailIcon from "@/assets/icons/email-icon.svg";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PropsWithChildren } from "react";

const ForgotPasswordCardSuccessData = {
  title: "Please check your email",
  description:
    "We've sent a link to your email address to reset your password. Please check it.",
};

export default function ForgotPasswordCardSuccess({
  children,
}: PropsWithChildren) {
  return (
    <Card className="border-top mx-auto max-w-5xl rounded-none shadow-xl">
      <img
        src={emailIcon}
        width={"80px"}
        className="mx-auto"
        alt="email icon"
      />
      <CardHeader className="">
        <CardTitle className="mx-auto p-2 text-2xl text-[#1A86C6]">
          {ForgotPasswordCardSuccessData.title}
        </CardTitle>
        <CardDescription className="mx-auto p-8 text-center text-lg text-gray-700">
          {ForgotPasswordCardSuccessData.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="mx-auto flex flex-1 flex-col">
        {children}
      </CardContent>
    </Card>
  );
}
