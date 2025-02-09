import logo from "@/assets/icons/logo-medium.svg";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { config } from "@/config/config";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { useState } from "react";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

import google from "@/assets/icons/google.svg";
import eyeIcon from "@/assets/icons/eye.svg";
import eyeOff from "@/assets/icons/eye-off.svg";
import LoadingSpinner from "../reusables/loading-spinner/load";
import { Button } from "../ui/button";

const formSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Name cannot be empty" })
    .max(60, { message: "Name must not exceed 60 characters" })
    .refine(
      (value) => !/^\s+|\s+$/.test(value ?? ""),
      "Please fill the correct name",
    ),
  email: z
    .string()
    .min(1, { message: "Email cannot be empty" })
    .max(254, { message: "Email must not exceed 254 characters" })
    .email({ message: "Invalid email format" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .max(50, { message: "Password must not be exceed 50 characters" })
    .refine((value) => !value.includes(" "), "Password must not contain spaces")
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
});

export default function Register() {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [passType, setPassType] = useState("password");
  const [isPassVisible, setIsPassVisible] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const handlePassVisibility = (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>,
  ) => {
    if (passType === "password") {
      setIsPassVisible(true);
      setPassType("text");
    } else {
      setIsPassVisible(false);
      setPassType("password");
    }
  };

  const canSubmit = () => {
    return !form.formState.isValid;
  };

  const handleOnSubmit = async (values: z.infer<typeof formSchema>) => {
    setErrorMsg("");
    setLoading(true);
    axios
      .post(config.API_BASE_URL + "/auth/register", values)
      .then(() => {
        setErrorMsg("");
      })
      .catch((error: AxiosError) => {
        if (error.response?.status == 401) {
          setErrorMsg("the email is already registered");
        } else if (error.response?.status == 400) {
          setErrorMsg("invalid email/password format");
        } else {
          setErrorMsg("server problem");
        }
      })
      .finally(() => {
        setLoading(false);
        navigate("/auth/login");
      });
  };

  return (
    <div className="fixed left-1/2 top-1/2 flex w-[440px] -translate-x-1/2 -translate-y-1/2 flex-col justify-center rounded-[30px] border-2 bg-[#f5FAFF] py-12 shadow-2xl">
      <img src={logo} className="m-auto" width="225px" height="47px" alt="" />
      <h2 className="mb-3 mt-6 text-center text-[2rem] font-bold text-[#1A86C6]">
        Register
      </h2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleOnSubmit)}
          className="m-auto flex w-fit flex-col gap-6"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    className="h-12 w-[18.75rem] rounded-lg border-[1px] border-[#1A86C6] bg-[#D4EDFF] px-5 py-3 placeholder-[#1A86C6] outline-none focus-visible:ring-inherit"
                    placeholder="Name"
                    {...field}
                    id="name"
                    type="text"
                    required
                  />
                </FormControl>
                <FormMessage className="text-red-600" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
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
                  />
                </FormControl>
                <FormMessage className="text-red-600" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <div className="relative flex items-center justify-center">
                    <Input
                      className="h-12 w-[18.75rem] rounded-lg border-[1px] border-[#1A86C6] bg-[#D4EDFF] px-5 py-3 placeholder-[#1A86C6] outline-none focus-visible:ring-inherit"
                      placeholder="Password"
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
          {errorMsg && <p className="text-red-600">{errorMsg}</p>}
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <>
              <Button
                type="submit"
                className={
                  canSubmit()
                    ? "opacity-80{} mt-6 w-[18.75rem] rounded-lg bg-[#5f5f5f] p-6 text-2xl text-white"
                    : "opacity-80{} mt-6 w-[18.75rem] rounded-lg bg-[#8FC641] p-6 text-2xl text-white"
                }
                disabled={canSubmit()}
              >
                Register
              </Button>
              <p className="mt-3 text-center text-xs text-[#1A86C6]">
                or sign in with
              </p>
              <button
                className="relative flex w-[18.75rem] items-center justify-center rounded-lg bg-[#FF3D00] p-3 text-2xl text-white opacity-80"
                type="submit"
                disabled={canSubmit()}
              >
                <img className="absolute left-4" src={google} alt="google" />
                Google
              </button>
            </>
          )}
        </form>
      </Form>
      <div className="my-4 flex w-full items-center justify-center">
        <p className="text-sm">
          Already have an account?{" "}
          <a className="w-fit text-sm text-[#1A86C6]" href="/auth/login">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
