import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { OrderPending, OrderPendingCatalog } from "@/models/user/order";
import { currencyFormat } from "@/utils/currencyFormatter";
import DateFormatter from "@/utils/dateFormatter";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Scrollbar } from "@radix-ui/react-scroll-area";
import PaymentDetail from "@/components/reusables/paymentDetail";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CancelButtonConfirmationModal from "@/components/reusables/CancelButtonConfirmationModal";
import useFetch from "@/hooks/useFetch";
import LoadingScreen from "@/components/reusables/loadingScreen";

export default function TransactionDetailPending(props: {
  order_group: OrderPending;
}) {
  const order_group = props.order_group;
  const detail = order_group.orders;

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
          <ScrollArea className="max-h-[50vh] w-full">
            {detail.map((order, key) => {
              return (
                <div key={key}>
                  <h1 className="font-bold text-primBlue">Order {key + 1}</h1>
                  <div className="border-b-4 pb-4">
                    <div className="grid grid-cols-2">
                      <p className="text-slate-600">Pharmacy</p>
                      <p className="text-right font-semibold">
                        {order.pharmacy_name}
                      </p>
                      <p className="text-slate-600">Order Number</p>
                      <p className="text-right">INV/{order.id}</p>
                      <p className="text-slate-600">Transaction Date</p>
                      <p className="text-right">
                        {DateFormatter(order_group.created_at)}
                      </p>
                    </div>
                  </div>
                  <div className="border-b-4 pb-4">
                    <h2 className="font-bold">Product Detail</h2>
                    {order.catalogs.map((product) => {
                      return (
                        <TransProductDetail prop={product} key={product.id} />
                      );
                    })}
                  </div>
                  <PaymentDetail
                    total_price_shipping={order_group.total_shipping_cost}
                    total_price_product={order_group.total_price}
                  />
                  <ButtonCancelOrder order_id={order.id} />
                  <div className="my-7">
                    <hr className="py-2" />
                    <hr className="py-2" />
                  </div>
                </div>
              );
            })}
            <Scrollbar orientation="vertical" />
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </>
  );
}

function TransProductDetail(props: { prop: OrderPendingCatalog }) {
  const product = props.prop;
  return (
    <>
      <div className="flex justify-between pt-2">
        <div>
          <p className="font-semibold">{product.name}</p>
          <p className="text-sm">
            {product.quantity} x Rp{currencyFormat(Number(product.price))}
          </p>
        </div>
      </div>
    </>
  );
}

function ButtonCancelOrder(props: { order_id: number }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const url = `/user/orders/${props.order_id}/cancel`;
  const { isLoading, fetchData: requestCancel } = useFetch<unknown>(url, {
    method: "PATCH",
  });

  const handleSetOpen = () => {
    setOpen((prev) => !prev);
  };
  const handleCancel = async () => {
    const resp = await requestCancel();
    if (resp != undefined) {
      navigate(0);
    }
  };
  return (
    <>
      {isLoading && <LoadingScreen />}
      <CancelButtonConfirmationModal
        message="Are you sure you want to cancel this order?"
        open={open}
        setOpen={setOpen}
        handleSetOpen={handleSetOpen}
        handleCancel={handleCancel}
      />
    </>
  );
}
