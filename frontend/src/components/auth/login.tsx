import { useEffect, useState } from "react";
import logo from "../../assets/icons/logo-medium.svg";
import google from "../../assets/icons/google.svg";
import Input from "./input";
import axios, { AxiosError } from "axios";
import { config } from "../../config/config";
import { LoginRequest } from "../../models/loginRequest";
import Cookies from "universal-cookie";
import LoadingSpinner from "../reusables/loading-spinner/load";

import eyeIcon from "../../assets/icons/eye.svg";
import eyeOff from "../../assets/icons/eye-off.svg";
import { jwtDecodedType, useDecodedJWTStore } from "@/store/useDecodedJWTStore";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { data, setData } = useDecodedJWTStore();
  const [email, setEmail] = useState<boolean | undefined>(undefined);
  const [password, setPassword] = useState<boolean | undefined>(undefined);
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setLoading] = useState(false);
  const cookies = new Cookies(null, { path: "/" });
  const [passType, setPassType] = useState("password");
  const [isPassVisible, setIsPassVisible] = useState(false);
  const navigate = useNavigate();
  // const [role, setRole] = useState(1);

  // function delay(ms: number) {
  //   return new Promise((resolve) => setTimeout(resolve, ms));
  // }
  const handlePassVisibility = () => {
    if (passType === "password") {
      setIsPassVisible(true);
      setPassType("text");
    } else {
      setIsPassVisible(false);
      setPassType("password");
    }
  };

  const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(() => {
      if (event.target.value == "") {
        return false;
      } else {
        return true;
      }
    });
  };
  const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(() => {
      if (event.target.value == "") {
        return false;
      } else {
        return true;
      }
    });
  };

  const canSubmit = () => {
    return !(email == true && password == true);
  };

  const handleLogin = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    setErrorMsg("");
    setLoading(true);
    const formData = new FormData(ev.currentTarget);
    const formEntries = Object.fromEntries(formData);

    const req = formEntries as LoginRequest;
    axios
      .post(config.API_BASE_URL + "/auth/login", req)
      .then(({ data }) => {
        setErrorMsg("");
        cookies.set("access_token", data.data.access_token);
        const jwtDecoded = jwtDecode(data.data.access_token) as jwtDecodedType;
        setData(jwtDecoded);
        if (jwtDecoded?.role == 1) {
          navigate("/admin/");
        }
        if (jwtDecoded?.role == 2) {
          navigate("/");
        }
        if (jwtDecoded?.role == 3) {
          navigate("/pharmacist/");
        }
      })
      .catch((error: AxiosError) => {
        if (error.response?.status == 400 || error.response?.status == 401) {
          setErrorMsg("invalid username or password");
        } else {
          setErrorMsg("server problem");
        }
      })
      .finally(async () => {
        setLoading(false);
      });
  };

  return (
    <div className="fixed left-1/2 top-1/2 flex w-[440px] -translate-x-1/2 -translate-y-1/2 flex-col justify-center rounded-[30px] border-2 bg-[#f5FAFF] py-12 shadow-2xl">
      <img src={logo} className="m-auto" width="225px" height="47px" alt="" />
      <h2 className="mb-3 mt-6 text-center text-[2rem] font-bold text-[#1A86C6]">
        Login
      </h2>
      <form onSubmit={handleLogin} className="m-auto flex w-fit flex-col gap-6">
        <Input
          name="email"
          type="email"
          placeHolder="Email"
          onChange={handleEmail}
          isValid={email}
          warningMsg={"Email cannot be empty"}
        />
        <div className="relative flex items-center justify-center">
          <Input
            name="password"
            type={passType}
            placeHolder="Password"
            onChange={handlePassword}
            isValid={password}
            warningMsg={"Password cannot be empty"}
          />
          <span
            className="absolute right-2 top-3 hover:cursor-pointer"
            onClick={handlePassVisibility}
          >
            {isPassVisible ? (
              <img src={eyeIcon} alt="password visible icon" />
            ) : (
              <img src={eyeOff} alt="password invisible icon" />
            )}
          </span>
        </div>
        {errorMsg && <p className="text-red-600">{errorMsg}</p>}

        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <>
            <button
              className={
                canSubmit()
                  ? "opacity-80{} mt-6 w-[18.75rem] rounded-lg bg-[#5f5f5f] p-2 text-2xl text-white"
                  : "opacity-80{} mt-6 w-[18.75rem] rounded-lg bg-[#8FC641] p-2 text-2xl text-white"
              }
              type="submit"
              disabled={canSubmit()}
            >
              Login
            </button>
            <div className="flex w-full justify-end">
              <a
                className="w-fit text-sm text-[#1A86C6] underline"
                href="/auth/forgot-password"
              >
                Forgot Password?
              </a>
            </div>
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
            <div className="my-4 flex w-full items-center justify-center">
              <p className="text-sm">
                Don't have an account?{" "}
                <a
                  className="w-fit text-sm text-[#1A86C6]"
                  href="/auth/register"
                >
                  Register
                </a>
              </p>
            </div>
          </>
        )}
      </form>
    </div>
  );
}
