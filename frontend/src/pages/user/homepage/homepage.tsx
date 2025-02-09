import Navbar from "@/pages/user/navbar/navbar";
import Footer from "@/components/reusables/footer";
import Categories from "./categories";
import Promotion from "./promotion";
import { Catalog, CatalogNoAddress } from "../catalog/catalog";
import VerifyBanner from "./verifyBanner";
import useBannerStore from "@/store/useBannerStore";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useProfileStore } from "@/store/useProfileStore";
import { useEffect } from "react";
import useDocumentTitle from "@/hooks/useDocumentTitle";
import useFetch from "@/hooks/useFetch";
import { PaginatedResponse } from "@/models/jsonResponse";
import { useProductCartStore } from "@/store/useProductCartStore";
import LoadingScreen from "@/components/reusables/loadingScreen";
import { useShallow } from "zustand/shallow";
import { CartResponse } from "@/models/user/cart";

export default function Homepage() {
  useDocumentTitle("Pharmacy | Homepage");
  const isDesktop = useMediaQuery("(min-width:768px)");
  const { data: profile } = useProfileStore();
  const { show } = useBannerStore();
  const setShow = useBannerStore((state) => state.setShow);
  const { data: dataUserCart, isLoading: isLoadingUserCart } = useFetch<
    PaginatedResponse<CartResponse>
  >("/user/carts", {
    method: "GET",
  });
  const { setImmediate } = useProductCartStore(useShallow((state) => state));

  useEffect(() => {
    if (profile?.is_verified) {
      setShow(false);
    }
  }, [profile, setShow]);

  // Sync Cart
  useEffect(() => {
    const responseData = dataUserCart?.data.entries;
    if (responseData) {
      responseData.map((item) => {
        setImmediate(item.id, item.quantity);
      });
    }
  }, [dataUserCart, setImmediate]);

  return (
    <>
      {isLoadingUserCart && <LoadingScreen />}
      <Navbar />
      {show ? <VerifyBanner /> : <></>}
      <div className="flex w-full justify-center md:p-6">
        <div className="w-full md:w-[960px]">
          <Promotion />
        </div>
      </div>
      <div className="flex w-full justify-center p-6">
        <Categories />
      </div>
      <div className="flex w-[100vw] justify-center bg-slate-100 p-6 md:w-full">
        {profile?.address && profile?.address.length != 0 ? (
          <Catalog />
        ) : (
          <CatalogNoAddress />
        )}
      </div>
      {isDesktop ? <Footer /> : <></>}
    </>
  );
}
