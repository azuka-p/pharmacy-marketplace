import logo from "../../../assets/icons/logo-medium.svg";
import { Link } from "react-router-dom";
import { CartAvatarNav } from "./rightNav";
import NavLocation from "./navLocation";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import useLoginStore from "@/store/useLoginStore";
import { LogRegNav } from "./loginNav";
import SearchInputUser from "@/pages/user/navbar/searchInputUser";
import { DropDownMobile } from "./dropdownMenu";

export default function Navbar() {
  const { isLogin } = useLoginStore();
  const isDesktop = useMediaQuery("(min-width:768px)");
  return (
    <>
      <nav className="sticky top-0 z-10 w-full flex-wrap border-b-[1px] border-y-zinc-50 border-b-slate-50 bg-white p-3">
        <div className="mb-3 flex w-full flex-row items-center justify-between gap-3 px-3 md:px-7">
          {isDesktop ? (
            <Link to="/">
              <img src={logo} alt="pharmacy logo picture" />
            </Link>
          ) : (
            <>
              <DropDownMobile />
            </>
          )}

          <SearchInputUser />
          <div className="flex items-center gap-3">
            {isLogin ? (
              <CartAvatarNav />
            ) : (
              <>{isDesktop ? <LogRegNav /> : <></>}</>
            )}
          </div>
        </div>
        <div className="mb-3">{isLogin ? <NavLocation /> : <></>}</div>
      </nav>
    </>
  );
}
