import useFetch from "@/hooks/useFetch";
import { PaginatedResponse } from "@/models/jsonResponse";
import { addressId } from "@/models/user/address";
import { cartCatalogResponse, CartResponse } from "@/models/user/cart";
import CartCard from "@/pages/user/cart/cartCard";
import ShoppingSummary from "@/pages/user/cart/shoppingSummary";
import { useProductCartStore } from "@/store/useProductCartStore";
import { useProfileStore } from "@/store/useProfileStore";
import { useEffect, useState } from "react";
import NoOrders from "../reusables/noOrders";
import { useShallow } from "zustand/shallow";
import CartCardUnavailable from "./cartUnavailable";
import AddressContainer from "@/pages/user/checkout/addressSection";
import NoAddress from "@/pages/user/cart/noAddress";
import { Skeleton } from "../ui/skeleton";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Cart() {
  const { setImmediate, setPrice, totalPrice, syncTotalCount } =
    useProductCartStore(useShallow((state) => state));
  const { getActiveAddress, data: userData } = useProfileStore();
  const address = getActiveAddress();
  const [canCheckout, setCanCheckout] = useState<boolean>(false);
  const { data, fetchData } = useFetch<cartCatalogResponse, addressId>(
    "/user/checkout/catalogs",
    {
      method: "POST",
    },
  );
  const { data: dataUserCart, isLoading: isLoadingUserCart } = useFetch<
    PaginatedResponse<CartResponse>
  >("/user/carts", {
    method: "GET",
  });

  useEffect(() => {
    if (data) {
      const dataAvailable = data.data.available;
      dataAvailable.forEach((item) => {
        item.catalogs.forEach((catalog) => {
          setPrice(catalog.product.id, Number(catalog.price));
          syncTotalCount();
        });
      });
    }
  }, [data]);

  useEffect(() => {
    if (address) fetchData({ address_id: address.id });
  }, [address, fetchData]);

  useEffect(() => {
    setCanCheckout(
      data?.data.unavailable.length == 0 && data?.data.available.length != 0,
    );
  }, [data]);

  useEffect(() => {
    const responseData = dataUserCart?.data.entries;
    if (responseData) {
      responseData.map((item) => {
        setImmediate(item.id, item.quantity);
      });
    }
  }, [dataUserCart, setImmediate]);

  if (userData?.activeAddressId == undefined) {
    return (
      <>
        <div className="flex justify-center bg-slate-50">
          <div className="w-[960px]">
            <h1 className="my-5 text-2xl font-extrabold">Cart</h1>
            <NoAddress />
          </div>
        </div>
      </>
    );
  }

  if (isLoadingUserCart) {
    return (
      <>
        <div className="flex justify-center bg-slate-50">
          <div className="w-[80%]">
            <h1 className="my-5 text-2xl font-extrabold">Cart</h1>
            <Card>
              <CardHeader>
                <CardTitle></CardTitle>
                <CardDescription></CardDescription>
                <Skeleton className="h-4 w-[150px] rounded-xl" />
                <Skeleton className="h-7 w-[150px] rounded-xl" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-7 w-[50%] rounded-xl" />
              </CardContent>
              <CardFooter></CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle></CardTitle>
                <CardDescription></CardDescription>
                <Skeleton className="h-4 w-[150px] rounded-xl" />
                <Skeleton className="h-7 w-[150px] rounded-xl" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-7 w-[50%] rounded-xl" />
              </CardContent>
              <CardFooter></CardFooter>
            </Card>
          </div>
        </div>
      </>
    );
  }
  return (
    <div className="flex justify-center bg-slate-50">
      <div>
        <h1 className="my-5 text-2xl font-extrabold">Cart</h1>
        <div className="flex w-[80vw] justify-between gap-5">
          <div className="flex w-full flex-col gap-3">
            {data?.data.available.length == 0 &&
            data.data.unavailable.length == 0 ? (
              <NoOrders />
            ) : (
              <>
                <AddressContainer />
                {data?.data.available.map((cart, key) => (
                  <CartCard
                    pharmacy={cart.pharmacy}
                    catalogs={cart.catalogs}
                    key={key}
                    isLoading={isLoadingUserCart}
                  />
                ))}
                {data?.data.unavailable[0] && (
                  <CartCardUnavailable
                    unavailableProducts={data?.data.unavailable}
                  />
                )}
              </>
            )}
          </div>
          {data?.data.available[0] && (
            <ShoppingSummary
              // totalProduct={data?.data.available}
              canCheckout={canCheckout}
              totalPrice={totalPrice}
            />
          )}
        </div>
      </div>
    </div>
  );
}
