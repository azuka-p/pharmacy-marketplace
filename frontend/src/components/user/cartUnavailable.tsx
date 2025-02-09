import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { unavailableCheckoutCardProps } from "@/models/user/checkout";
import DeleteCart from "./deleteCart";
import useFetch from "@/hooks/useFetch";
import { useProductCartStore } from "@/store/useProductCartStore";
import { useEffect, useState } from "react";

export default function CartCardUnavailable(
  props: unavailableCheckoutCardProps,
) {
  const [cartCount, setCartCount] = useState(props.unavailableProducts.length);
  const { cartMap, deleteCart, syncTotalCount } = useProductCartStore();
  const { fetchData: reqDelete } = useFetch<unknown, { product_id: number }>(
    "/user/carts/remove",
    { method: "POST" },
  );
  const handleOnDelete = (productId: number) => {
    reqDelete({ product_id: productId });
    deleteCart(productId);
    syncTotalCount();
  };

  useEffect(() => {
    setCartCount(() => {
      let count = 0;
      props.unavailableProducts.forEach((catalog) => {
        if (cartMap.has(catalog.product.id)) {
          count++;
        }
      });
      return count;
    });
  });
  return (
    <>
      {cartCount != 0 && (
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="capitalize text-red-500">
              Unavailable Product to Checkout!
            </CardTitle>
            <p>consider changing your address or remove product from cart!</p>
          </CardHeader>
          <CardContent>
            {props.unavailableProducts.map((data, key) => {
              const cartItem = cartMap.get(data.product.id);
              if (cartItem) {
                if (cartItem.count != 0) {
                  return (
                    <div key={key} className="flex w-full items-center gap-2">
                      <img
                        src={data.product.image}
                        className="h-full w-20 rounded-md border-[1px] border-slate-50"
                      />
                      <div className="flex w-full justify-between">
                        <p className="w-[80%] text-left">
                          {data.quantity} X {data.product.name}
                        </p>
                        <DeleteCart
                          onClick={() => handleOnDelete(data.product.id)}
                          productId={data.product.id}
                        />
                      </div>
                    </div>
                  );
                }
              }
            })}
          </CardContent>
        </Card>
      )}
    </>
  );
}
