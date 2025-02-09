import Cookies from "universal-cookie";
import logo from "../../assets/icons/logo-medium.svg";
import NavLink from "./navLink.tsx";
import { Link, useNavigate } from "react-router-dom";
import { useCategoryStore } from "@/store/ProductCategoryStore.ts";
import { useDecodedJWTStore } from "@/store/useDecodedJWTStore.ts";

export default function NavAdmin() {
  const cookies = new Cookies(null, { path: "/" });
  const domain = location.hostname;
  const navigate = useNavigate();
  const { reset: resetCategoryStore } = useCategoryStore();
  const { reset: resetDecodedJWT } = useDecodedJWTStore();

  const handleLogout = () => {
    cookies.remove("access_token", { path: "/", domain: domain });
    resetCategoryStore();
    resetDecodedJWT();
    navigate("/auth/login");
  };

  return (
    <div className="sticky top-0 z-10 flex w-screen items-center justify-between bg-white px-12 py-7 shadow-xl">
      <Link to={"/admin/dashboard"}>
        <img src={logo} alt="pharmacy logo picture" className="w-full" />
      </Link>
      <div className="flex gap-6">
        <NavLink href="users">Users</NavLink>
        <NavLink href="pharmacists">Pharmacist</NavLink>
        <NavLink href="pharmacies">Pharmacy</NavLink>
        <NavLink href="partners">Partner</NavLink>
        <NavLink href="products" swtichTab="product-categories">
          Product
        </NavLink>
        <NavLink href="orders">Orders</NavLink>
        <NavLink href="">Report</NavLink>
      </div>
      <p onClick={handleLogout} className="text-2xl hover:cursor-pointer">
        Logout
      </p>
    </div>
  );
}
