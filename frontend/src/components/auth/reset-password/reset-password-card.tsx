import logo from "@/assets/icons/logo-medium.svg";
import eyeIcon from "@/assets/icons/eye.svg";
import eyeOff from "@/assets/icons/eye-off.svg";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import LoadingSpinner from "@/components/reusables/loading-spinner/load";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import { Input } from "../../ui/input";

import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { resetPasswordRequest } from "@/models/resetPasswordRequest";
import { zodResolver } from "@hookform/resolvers/zod";
import { ToastAction } from "@/components/ui/toast";
import useFetch from "@/hooks/useFetch";
import NotFoundPage from "@/pages/notFoundPage";
import { Toaster } from "@/components/ui/toaster";

const ResetPasswordCardData = {
  title: "Reset Password",
  description:
    "Please enter your new password and confirm it to reset your password",
  footer: "",
};

const formSchemaResetPassword = z
  .object({
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" })
      .max(50, { message: "Password must not be exceed 50 characters" })
      .refine(
        (value) => !value.includes(" "),
        "Password must not contain spaces",
      )
      .refine(
        (value) => /^(?=.*?[A-Z])(?=.*?[a-z]).{8,50}$/.test(value ?? ""),
        "Password must be at least one uppercase letter",
      )
      .refine(
        (value) => /^(?=.*?[1-9]).{8,50}$/.test(value ?? ""),
        "Password must be at least one number",
      )
      .refine(
        (value) => /^(?=.*?[!-\/:-@[-`{-~]).{8,50}$/.test(value ?? ""),
        "Password must be at least one special character",
      ),
    confirmPassword: z.string(),
  })
  .refine(
    (values) => {
      return values.password === values.confirmPassword;
    },
    {
      message: "Confirmation password doesn't match",
      path: ["confirmPassword"],
    },
  );

interface ResetPasswordCardProps {
  setNext: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ResetPasswordCard({ setNext }: ResetPasswordCardProps) {
  const token = location.search.split("=")[1];
  if (token === undefined) {
    return <NotFoundPage />;
  }

  const [passType, setPassType] = useState("password");
  const [isPassVisible, setIsPassVisible] = useState(false);

  const [confirmPassType, setConfirmPassType] = useState("password");
  const [isConfirmPassVisible, setIsConfirmPassVisible] = useState(false);

  const [isResetPasswordSuccess, setIsResetPasswordSuccess] = useState(false);
  const { toast } = useToast();

  const {
    error,
    isLoading,
    fetchData: respResetPassword,
  } = useFetch<unknown, resetPasswordRequest>("/auth/reset-password", {
    method: "POST",
  });

  const handleOnClickConfirm = async (
    values: z.infer<typeof formSchemaResetPassword>,
  ) => {
    const req = { password: values.password, token: token };
    const response = await respResetPassword(req);

    if (response != undefined) {
      setNext(true);
      setIsResetPasswordSuccess(true);
    }
  };

  const form = useForm<z.infer<typeof formSchemaResetPassword>>({
    resolver: zodResolver(formSchemaResetPassword),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
    mode: "onChange",
  });

  const disableSubmit = () => {
    return !form.formState.isValid;
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
    if (isResetPasswordSuccess) {
      toast({
        title: "Reset Password Successfull",
        description: "You can use your new password now!",
        className: "my-2",
      });
      setIsResetPasswordSuccess(false);
    }
  }, [error, isResetPasswordSuccess]);

  const handlePassVisibility = () => {
    if (passType === "password") {
      setIsPassVisible(true);
      setPassType("text");
    } else {
      setIsPassVisible(false);
      setPassType("password");
    }
  };

  const handleConfirmPassVisibility = () => {
    if (confirmPassType === "password") {
      setIsConfirmPassVisible(true);
      setConfirmPassType("text");
    } else {
      setIsConfirmPassVisible(false);
      setConfirmPassType("password");
    }
  };

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
          <CardHeader className="">
            <CardTitle className="mx-auto p-2 text-2xl text-[#1A86C6]">
              {ResetPasswordCardData.title}
            </CardTitle>
            <CardDescription className="mx-auto p-8 text-center text-lg text-gray-700">
              {ResetPasswordCardData.description}
            </CardDescription>
          </CardHeader>
          <CardContent className="mx-auto flex flex-1 flex-col">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleOnClickConfirm)}
                className="m-auto flex w-fit flex-col gap-6"
              >
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>New password</FormLabel>
                      <FormControl>
                        <div className="relative flex items-center justify-center">
                          <Input
                            className="h-12 w-[18.75rem] rounded-lg border-[1px] border-[#1A86C6] bg-[#D4EDFF] px-5 py-3 placeholder-[#1A86C6] outline-none focus-visible:ring-inherit"
                            placeholder="New password"
                            {...field}
                            id="password"
                            type={passType}
                            required
                          />
                          <span
                            className="absolute right-2 hover:cursor-pointer"
                            onClick={handlePassVisibility}
                          >
                            {isPassVisible ? (
                              <img src={eyeIcon} alt="password visible icon" />
                            ) : (
                              <img src={eyeOff} alt="password invisible icon" />
                            )}
                          </span>
                        </div>
                      </FormControl>
                      <FormMessage className="text-red-600" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm new password</FormLabel>
                      <FormControl>
                        <div className="relative flex items-center justify-center">
                          <Input
                            className="h-12 w-[18.75rem] rounded-lg border-[1px] border-[#1A86C6] bg-[#D4EDFF] px-5 py-3 placeholder-[#1A86C6] outline-none focus-visible:ring-inherit"
                            placeholder="Confirm new password"
                            {...field}
                            id="confirm password"
                            type={confirmPassType}
                            required
                          />
                          <span
                            className="absolute right-2 hover:cursor-pointer"
                            onClick={handleConfirmPassVisibility}
                          >
                            {isConfirmPassVisible ? (
                              <img
                                src={eyeIcon}
                                alt="confirm password visible icon"
                              />
                            ) : (
                              <img
                                src={eyeOff}
                                alt="confirm password invisible icon"
                              />
                            )}
                          </span>
                        </div>
                      </FormControl>
                      <FormMessage className="text-red-600" />
                    </FormItem>
                  )}
                />
                {isLoading ? (
                  <LoadingSpinner />
                ) : (
                  <>
                    <Button
                      type="submit"
                      className={
                        disableSubmit()
                          ? "opacity-80{} mt-6 w-[18.75rem] rounded-lg bg-[#5f5f5f] p-6 text-2xl text-white"
                          : "opacity-80{} mt-6 w-[18.75rem] rounded-lg bg-[#8FC641] p-6 text-2xl text-white"
                      }
                      disabled={disableSubmit()}
                    >
                      Reset Password
                    </Button>
                  </>
                )}
              </form>
            </Form>
          </CardContent>
          <CardFooter>
            <p className="mx-auto border-t-2 p-4 text-base italic text-gray-500">
              {ResetPasswordCardData.footer}
            </p>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
