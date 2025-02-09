import PaymentDetail from "@/components/reusables/paymentDetail";
import TransactionProductDetail from "@/components/reusables/transactionProductDetail";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { OrderResponse } from "@/models/user/order";
import DateFormatter from "@/utils/dateFormatter";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Scrollbar } from "@radix-ui/react-scroll-area";

export default function TransactionDetail(props: { props: OrderResponse }) {
  const detail = props.props;

  return (
    <>
      <Dialog>
        <DialogTrigger className="w-full text-right text-sm font-semibold text-primBlue">
          See Transaction Detail
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-xl">Transaction Detail</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <ScrollArea className="h-min max-h-[50vh] w-full">
            <h1 className="font-bold text-primBlue">Order {detail.status}</h1>
            <div className="border-b-4 pb-4">
              <div className="grid grid-cols-2">
                <p className="text-slate-600">Pharmacy</p>
                <p className="text-right font-semibold">
                  {detail.pharmacy_name}
                </p>
                <p className="text-slate-600">Order Number</p>
                <p className="text-right">INV/{detail.id}</p>
                <p className="text-slate-600">Transaction Date</p>
                <p className="text-right">{DateFormatter(detail.created_at)}</p>
              </div>
            </div>
            <div className="border-b-4 pb-4">
              <h2 className="font-bold">Product Detail</h2>
              {detail.order_items.map((product) => {
                return (
                  <>
                    <TransactionProductDetail
                      key={product.id}
                      image={product.product_image}
                      name={product.product_name}
                      price={product.price}
                      quantity={product.quantity}
                    />
                  </>
                );
              })}
            </div>
            <PaymentDetail
              total_price_shipping={detail.total_price_shipping}
              total_price_product={detail.total_price_product}
            />
            <Scrollbar orientation="vertical" />
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </>
  );
}
