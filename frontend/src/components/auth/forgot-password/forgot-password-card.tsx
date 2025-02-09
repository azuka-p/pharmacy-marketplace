import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PropsWithChildren } from "react";

const ForgotPasswordCardData = {
  title: "Forgot Password",
  description:
    "Please enter your email and we'll send you a link to reset your password.",
  footer: "",
};

export default function ForgotPasswordCard({ children }: PropsWithChildren) {
  return (
    <Card className="border-top mx-auto max-w-5xl rounded-none shadow-xl">
      <CardHeader className="">
        <CardTitle className="mx-auto p-2 text-2xl text-[#1A86C6]">
          {ForgotPasswordCardData.title}
        </CardTitle>
        <CardDescription className="mx-auto p-8 text-center text-lg text-gray-700">
          {ForgotPasswordCardData.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="mx-auto flex flex-1 flex-col">
        {children}
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
}
