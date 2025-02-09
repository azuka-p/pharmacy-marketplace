import { currencyFormat } from "@/utils/currencyFormatter";
import CounterButton from "@/components/reusables/counterButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CartCardProps, CartItemsProps } from "@/models/user/cart";
import useFetch from "@/hooks/useFetch";
import DeleteCart from "@/components/user/deleteCart";
import { useProductCartStore } from "@/store/useProductCartStore";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";

export default function CartCard(props: CartCardProps) {
  const { cartMap, deleteCart, syncTotalCount } = useProductCartStore();
  const [cartCount, setCartCount] = useState(props.catalogs.length);

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
      props.catalogs.forEach((catalog) => {
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
        <Card className="mb-3 w-full">
          <CardHeader>
            <CardTitle>
              {props.isLoading ? (
                <Skeleton className="h-6 w-[150px] rounded-xl" />
              ) : (
                <>
                  <div className="flex gap-3 text-lg">
                    {props.pharmacy.name}
                  </div>
                </>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {props.isLoading ? (
              <></>
            ) : (
              <>
                {props.catalogs.map((data) => {
                  const cartItem = cartMap.get(data.product.id);
                  if (cartItem) {
                    if (cartItem.count != 0) {
                      return (
                        <>
                          <CartItem
                            key={data.id}
                            onDelete={() => handleOnDelete(data.product.id)}
                            image={data.product.image}
                            name={data.product.name}
                            price={data.price}
                            id={data.product.id}
                            stock={data.stock}
                          />
                        </>
                      );
                    }
                  }
                })}
              </>
            )}
          </CardContent>
        </Card>
      )}
    </>
  );
}

function CartItem(props: CartItemsProps) {
  return (
    <>
      <div className="flex items-center gap-3 border-b-2 border-slate-50 py-3">
        <div className="flex h-20 w-full justify-between gap-4">
          <img
            src={props.image}
            className="h-full w-20 rounded-md border-[1px] border-slate-50"
          />
          <p className="w-full text-left">{props.name}</p>
          <div>
            <p className="mb-4 text-right font-bold">
              Rp{currencyFormat(Number(props.price))}
            </p>
            <div className="flex items-center gap-3">
              <DeleteCart onClick={props.onDelete} productId={props.id} />
              <CounterButton id={props.id} stockLimit={props.stock} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
