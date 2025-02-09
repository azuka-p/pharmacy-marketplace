import CartIcon from "./shoppingCart";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { DropDownDesktop } from "./dropdownMenu";
import { useNavigate } from "react-router-dom";
import { useProfileStore } from "@/store/useProfileStore";
import useLoginStore from "@/store/useLoginStore";
import { useProductCartStore } from "@/store/useProductCartStore";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Skeleton } from "@/components/ui/skeleton";
import Cookies from "universal-cookie";
import { useDecodedJWTStore } from "@/store/useDecodedJWTStore";

export function CartAvatarNav() {
  const isDesktop = useMediaQuery("(min-width:768px)");
  const { data } = useDecodedJWTStore();

  return (
    <>
      {data?.is_verified ? <CartIcon /> : <></>}
      {/* <CartIcon /> */}
      {isDesktop ? <DropDownDesktop /> : <></>}
    </>
  );
}

export function AvatarDropDown() {
  const navigate = useNavigate();
  const { data } = useProfileStore();
  const cookies = new Cookies(null, { path: "/" });
  const { reset: resetProfile } = useProfileStore();
  const { reset: resetCart } = useProductCartStore();
  const { reset: resetLogin } = useLoginStore();
  const firstName = data?.name.split(" ")[0];
  const domain = location.hostname;

  const handleLogout = () => {
    resetProfile();
    resetCart();
    resetLogin();
    cookies.remove("access_token", { path: "/", domain: domain });
    navigate("/");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-min w-min py-0">
          <div className="flex items-center gap-3">
            <Avatar className="items-center">
              <AvatarImage
                src={
                  data?.profile_picture
                    ? data?.profile_picture
                    : "https://res.cloudinary.com/du7gzvlxs/image/upload/v1736927959/buaexckhjywdntkwpllk.png"
                }
                className="object-fit h-7 w-7"
              />
              <AvatarFallback>
                <Skeleton />
              </AvatarFallback>
            </Avatar>
            <p className="hidden md:block">{firstName}</p>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Hello, {firstName}!</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={() => {
              navigate("profile");
            }}
          >
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              navigate("order-history");
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
