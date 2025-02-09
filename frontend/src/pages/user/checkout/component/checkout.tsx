import { cartCatalogResponse } from "@/models/user/cart";
import CheckoutSummary from "./checkout-summary/checkoutSummary";
import CheckoutCard from "./checkoutCard";
import { addressId } from "@/models/user/address";
import useFetch from "@/hooks/useFetch";
import { useProfileStore } from "@/store/useProfileStore";
import { useEffect, useMemo, useState } from "react";
import {
  CheckoutOrderGroup,
  OrderPharmacyDetail,
} from "@/models/user/checkout";
import { useNavigate } from "react-router-dom";
import { useProductCartStore } from "@/store/useProductCartStore";
import AddressContainer from "../addressSection";
import CheckoutCardUnavailable from "./checkoutCardUnavailbale";

export default function Checkout() {
  const navigate = useNavigate();
  const { reset: resetCart } = useProductCartStore();
  const { totalPrice, setPrice, syncTotalCount } = useProductCartStore();
  const { getActiveAddress } = useProfileStore();
  const userAddress = getActiveAddress();
  const [shippingFeeTotal, setShippingFeeTotal] = useState<number>(0);
  const [orderDetails, setOrderDetails] = useState<OrderPharmacyDetail[]>();

  const { data: cartResponse, fetchData } = useFetch<
    cartCatalogResponse,
    addressId
  >("/user/checkout/catalogs", { method: "POST" });

  const { fetchData: orderRequest } = useFetch<unknown, CheckoutOrderGroup>(
    "/user/order-groups",
    { method: "POST" },
  );

  useEffect(() => {
    if (cartResponse) {
      const dataAvailable = cartResponse.data.available;
      dataAvailable.forEach((item) => {
        item.catalogs.forEach((catalog) => {
          setPrice(catalog.product.id, Number(catalog.price));
          syncTotalCount();
        });
      });
    }
  }, [cartResponse]);

  useMemo(() => {
    if (userAddress) fetchData({ address_id: userAddress.id });
  }, [fetchData, userAddress]);

  const handleOnSelectLogistic = (
    cost: number,
    orderDetailParam: OrderPharmacyDetail[],
  ) => {
    setShippingFeeTotal((shippingFeeTotal) => shippingFeeTotal + cost);
    setOrderDetails(orderDetailParam);
  };

  const handleOnSubmit = async () => {
    if (!orderDetails) {
      return;
    }
    if (!userAddress) {
      return;
    }
    const resp = await orderRequest({
      address_id: userAddress.id,
      order_pharmacy_details: orderDetails,
      payment_method_id: 1,
    });
    if (resp != undefined) {
      resetCart();
      navigate("/user/order-history");
    }
  };

  return (
    <div className="flex justify-center bg-slate-50">
      <div className="w-[80vw]">
        <h1 className="my-5 text-2xl font-extrabold">Checkout</h1>
        <div className="flex justify-between gap-5">
          <section className="grid w-full grid-cols-1 gap-2">
            <AddressContainer />
            <div className="flex flex-col gap-2">
              {cartResponse?.data.available.map((cart, key) => (
                <CheckoutCard
                  orderPharmacyDetails={orderDetails}
                  onSelect={handleOnSelectLogistic}
                  key={key}
                  pharmacy={cart.pharmacy}
                  catalogs={cart.catalogs}
                  address_id={userAddress?.id}
                />
              ))}
            </div>
            <div className="w-full">
              {cartResponse?.data.unavailable[0] && (
                <CheckoutCardUnavailable
                  unavailableProducts={cartResponse?.data.unavailable}
                />
              )}
            </div>
          </section>
          <CheckoutSummary
            isAllShippingFullfilled={
              orderDetails?.length == cartResponse?.data.available.length
            }
            onSubmit={handleOnSubmit}
            totalPrice={totalPrice}
            shippingFee={shippingFeeTotal}
          />
        </div>
      </div>
    </div>
  );
}
