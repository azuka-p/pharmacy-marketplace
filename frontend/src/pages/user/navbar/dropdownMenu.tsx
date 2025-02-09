import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useProfileStore } from "@/store/useProfileStore";
import useLoginStore from "@/store/useLoginStore";
import logoheart from "../../../assets/icons/logo-heart.svg";
import useBannerStore from "@/store/useBannerStore";
import { useProductCartStore } from "@/store/useProductCartStore";
import Cookies from "universal-cookie";
import { useDecodedJWTStore } from "@/store/useDecodedJWTStore";

export function DropDownMobile() {
  const navigate = useNavigate();
  const cookies = new Cookies(null, { path: "/" });
  const { isLogin } = useLoginStore();
  const { data, reset: resetProfile } = useProfileStore();
  const { reset: resetCart } = useProductCartStore();
  const { reset: resetLogin } = useLoginStore();
  const { reset: resetDecodedJWT } = useDecodedJWTStore();
  const domain = location.hostname;

  const handleLogout = () => {
    resetProfile();
    resetCart();
    resetLogin();
    resetDecodedJWT();
    cookies.remove("access_token", { path: "/", domain: domain });
    navigate("/");
  };

  if (!isLogin) {
    return (
      <>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <img src={logoheart} className="h-7 w-7" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Welcome!</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                navigate("/");
              }}
            >
              Home
            </DropdownMenuItem>
            <DropdownMenuGroup>
              <DropdownMenuItem
                onClick={() => {
                  navigate("/auth/login");
                }}
              >
                Login
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  navigate("/auth/register");
                }}
              >
                Register
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <img src={logoheart} className="h-7 w-7" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Hello, {data?.name}!</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            navigate("/");
          }}
        >
          Home
        </DropdownMenuItem>
        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={() => {
              navigate("/user/profile");
            }}
          >
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              navigate("/user/order-history");
            }}
          >
            Orders
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function DropDownDesktop() {
  const navigate = useNavigate();
  const { data } = useProfileStore();
  const cookies = new Cookies(null, { path: "/" });
  const { reset: resetProfile } = useProfileStore();
  const { reset: resetCart } = useProductCartStore();
  const { reset: resetLogin } = useLoginStore();
  const { reset: resetShow } = useBannerStore();
  const { reset: resetDecodedJWT } = useDecodedJWTStore();
  const domain = location.hostname;
  const { data: verifyStatus } = useDecodedJWTStore();

  const handleLogout = () => {
    resetProfile();
    resetCart();
    resetLogin();
    resetShow();
    resetDecodedJWT();
    cookies.remove("access_token", { path: "/", domain: domain });
    navigate("/");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-min w-min py-0">
          <div className="flex items-center">
            <Avatar
              className="cursor-pointer items-center"
              onClick={() => {
                navigate("/profile");
              }}
            >
              <AvatarImage src={data?.profile_picture} className="h-7 w-7" />
              <AvatarFallback>
                <Skeleton />
              </AvatarFallback>
            </Avatar>
            <p className="hidden md:block">{data?.name}</p>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Hello, {data?.name}!</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={() => {
              navigate("/user/profile");
            }}
          >
            Profile
          </DropdownMenuItem>
          {verifyStatus?.is_verified ? (
            <DropdownMenuItem
              onClick={() => {
                navigate("/user/order-history");
              }}
            >
              Orders
            </DropdownMenuItem>
          ) : (
            <></>
          )}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
