import logo from "@/assets/icons/logo-medium.svg";
import { useEffect, useState } from "react";
import ForgotPasswordCard from "./forgot-password-card";
import ForgotPasswordCardSuccess from "./forgot-password-card-success";
import { ToastAction } from "@radix-ui/react-toast";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import useFetch from "@/hooks/useFetch";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Toaster } from "@/components/ui/toaster";
import { forgotPasswordRequest } from "@/models/forgotPasswordRequest";
import LoadingSpinner from "@/components/reusables/loading-spinner/load";

const COUNT_DOWN_VALUE = 300000; //5 min

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import { Input } from "../../ui/input";
import TimerDown from "@/components/reusables/timerDown";
import { formSchemaForgotPassword } from "./formSchemaForgotPassword";
import ButtonSendTheLink from "./buttonSendLink";

const LOCALSTORAGE_NAME = "forgot_pass_layout";

interface storedForgotPasswordLayout {
  is_next: boolean;
  is_timer_on: boolean;
  email: string;
}

export default function ForgotPassword() {
  const storedForgotPass: storedForgotPasswordLayout = JSON.parse(
    localStorage.getItem(LOCALSTORAGE_NAME) || "{}",
  );

  const [next, setNext] = useState(
    storedForgotPass.is_next ? storedForgotPass.is_next : false,
  );
  const [isTimerOn, setIsTimerOn] = useState(
    storedForgotPass.is_timer_on ? storedForgotPass.is_timer_on : false,
  );
  const [isTokenGenerated, setIsTokenGenerated] = useState(false);

  const { toast } = useToast();
  const {
    error,
    isLoading,
    fetchData: respToken,
  } = useFetch<unknown, forgotPasswordRequest>("/auth/forgot-password", {
    method: "POST",
  });

  const formForgotPass = useForm<z.infer<typeof formSchemaForgotPassword>>({
    resolver: zodResolver(formSchemaForgotPassword),
    defaultValues: {
      email: storedForgotPass.email ? storedForgotPass.email : "",
    },
    mode: "onChange",
  });

  const handleOnClickGenerateToken = async (
    values: z.infer<typeof formSchemaForgotPassword>,
  ) => {
    const response = await respToken(values);
    if (response != undefined) {
      const prev: storedForgotPasswordLayout = JSON.parse(
        localStorage.getItem(LOCALSTORAGE_NAME) || "{}",
      );
      setNext(true);
      setIsTokenGenerated(true);
      setIsTimerOn(true);

      prev.email = values.email;
      prev.is_next = true;
      prev.is_timer_on = true;
      localStorage.setItem(LOCALSTORAGE_NAME, JSON.stringify(prev));
    }
  };

  useEffect(() => {
    const prev: storedForgotPasswordLayout = JSON.parse(
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
    if (error != undefined) {
      toast({
        variant: "destructive",
        title: "Something went wrong",
        description: error.error[0].message,
        className: "my-2",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    }
    if (isTokenGenerated) {
      toast({
        title: "Reset Password Token Generated",
        description: "You can reset your password now! Check your email",
        className: "my-2",
      });
      setIsTokenGenerated(false);
    }
  }, [error, isTokenGenerated]);

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
        <Form {...formForgotPass}>
          <form
            id="formForgotPass"
            onSubmit={formForgotPass.handleSubmit(handleOnClickGenerateToken)}
          >
            {!next ? (
              <ForgotPasswordCard>
                <div className="m-auto flex w-fit flex-col gap-6">
                  <FormField
                    control={formForgotPass.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            className="h-12 w-[18.75rem] rounded-lg border-[1px] border-[#1A86C6] bg-[#D4EDFF] px-5 py-3 placeholder-[#1A86C6] outline-none focus-visible:ring-inherit"
                            placeholder="Email"
                            {...field}
                            id="email"
                            type="email"
                            required
                            hidden={next}
                          />
                        </FormControl>
                        <FormMessage className="text-red-600" />
                      </FormItem>
                    )}
                  />
                  {isLoading ? (
                    <LoadingSpinner />
                  ) : (
                    <ButtonSendTheLink
                      buttonText="Send the link"
                      disabled={!formForgotPass.formState.isValid}
                      form="formForgotPass"
                      isLoading={isLoading}
                    />
                  )}
                </div>
              </ForgotPasswordCard>
            ) : (
              <ForgotPasswordCardSuccess>
                {isLoading ? (
                  <LoadingSpinner />
                ) : (
                  <>
                    <ButtonSendTheLink
                      buttonText="Resend the link"
                      disabled={!formForgotPass.formState.isValid || isTimerOn}
                      form="formForgotPass"
                      isLoading={isLoading}
                    />
                  </>
                )}
                {isTimerOn && (
                  <div className="flex flex-row items-center justify-center gap-1">
                    <p className="text-sm">resend will be available in</p>
                    <TimerDown
                      setIsTimerOn={setIsTimerOn}
                      countDownValue={COUNT_DOWN_VALUE}
                      className="text-md"
                      localStorageName="forgotPassLayout"
                    />
                  </div>
                )}
                {!isTimerOn && (
                  <p className="text- text-md mt-4 text-center">
                    *You can change the email by refreshing the page
                  </p>
                )}
              </ForgotPasswordCardSuccess>
            )}
          </form>
        </Form>
      </div>
    </>
  );
}
