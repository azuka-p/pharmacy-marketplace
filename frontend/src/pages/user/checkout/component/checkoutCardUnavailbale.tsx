import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useFetch from "@/hooks/useFetch";
import { unavailableCheckoutCardProps } from "@/models/user/checkout";
import { useProductCartStore } from "@/store/useProductCartStore";

export default function CheckoutCardUnavailable(
  props: unavailableCheckoutCardProps,
) {
  const { deleteCart, syncTotalCount } = useProductCartStore();

  const { fetchData: reqDelete } = useFetch<unknown, { product_id: number }>(
    "/user/carts/remove",
    { method: "POST" },
  );
  const handleOnDelete = (productId: number) => {
    reqDelete({ product_id: productId });
    deleteCart(productId);
    syncTotalCount();
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="capitalize text-red-500">
          Unavailable Product to Checkout!
        </CardTitle>
        <p>Please go back to cart page to checkout only available products</p>
      </CardHeader>
      <CardContent>
        {props.unavailableProducts.map((data, key) => {
          return (
            <div key={key} className="flex w-full items-center gap-2">
              <img
                onClick={() => handleOnDelete(data.product.id)}
                src={data.product.image}
                className="h-full w-20 rounded-md border-[1px] border-slate-50"
              />
              <div className="flex w-full justify-between">
                <p className="w-[80%] text-left">
                  {data.quantity} X {data.product.name}
                </p>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
