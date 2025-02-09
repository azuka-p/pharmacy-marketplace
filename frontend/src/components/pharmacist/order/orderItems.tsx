import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { CURRENCY } from "@/constants";
import { orderItemType } from "@/models/pharmacistOrderResponse";
import { currencyFormat } from "@/utils/currencyFormatter";

interface OrderItemsProps {
  data: orderItemType[];
}

export function OrderItems(props: OrderItemsProps) {
  return (
    <div className="mb-2">
      <ScrollArea className="max-h-72 overflow-y-auto rounded-md border p-2 text-slate-600 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 [&::-webkit-scrollbar]:w-2">
        {props.data.map((item, key) => (
          <div className="flex gap-2 pt-2" key={key}>
            <img
              src={item.product_image}
              className="h-12 w-12 rounded-md"
              alt={"order detail image"}
            />
            <div>
              <p className="font-semibold">{item.product_name}</p>
              <p className="text-sm">
                {`${item.quantity} x ${CURRENCY} ${currencyFormat(Number(item.price))}`}
              </p>
            </div>
          </div>
        ))}
        <ScrollBar orientation="vertical" />
      </ScrollArea>
    </div>
  );
}
