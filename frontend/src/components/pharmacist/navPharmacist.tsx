import Cookies from "universal-cookie";
import logo from "../../assets/icons/logo-medium.svg";
import NavLink from "./navLink";
import { Link, useNavigate } from "react-router-dom";
import { useDecodedJWTStore } from "@/store/useDecodedJWTStore";

export default function NavPharmacist() {
  const cookies = new Cookies(null, { path: "/" });
  const domain = location.hostname;
  const navigate = useNavigate();
  const { reset: resetDecodedJWT } = useDecodedJWTStore();

  const handleLogout = () => {
    cookies.remove("access_token", { path: "/", domain: domain });
    resetDecodedJWT();
    navigate("/auth/login");
  };

  return (
    <div className="sticky top-0 z-10 flex w-screen items-center justify-between bg-white px-12 py-7 shadow-xl">
      <Link to={"/pharmacist/dashboard"}>
        <img src={logo} alt="logo image" className="w-full" />
      </Link>
      <div className="flex gap-6">
        <NavLink href="pharmacy">Pharmacy</NavLink>
        <NavLink href="catalogs">Products</NavLink>
        <NavLink href="orders">Orders</NavLink>
      </div>
      <p onClick={handleLogout} className="text-2xl hover:cursor-pointer">
        Logout
      </p>
    </div>
  );
}
