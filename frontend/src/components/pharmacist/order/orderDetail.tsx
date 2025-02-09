import { BackButton } from "@/components/reusables/formButton";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import useFetch from "@/hooks/useFetch";
import { pharmacistOrderDetailResponse } from "@/models/pharmacistOrderResponse";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import LoadingScreen from "@/components/reusables/loadingScreen";
import { OrderItems } from "./orderItems";
import {
  CURRENCY,
  PROCESSED,
  SUCCESS_RESPONSE_CODE,
  WAITING_FOR_PAYMENT,
} from "@/constants";
import { currencyFormat } from "@/utils/currencyFormatter";
import getOrderStatusBadge from "@/components/reusables/getOrderStatusBadge";
import OrderDetailField from "./orderDetailField";
import { Separator } from "@/components/ui/separator";
import CancelButtonConfirmationModal from "@/components/reusables/CancelButtonConfirmationModal";

const PHARMACIST_ORDER_URL = "/pharmacist/orders";

interface propsOrderDetail {
  data: pharmacistOrderDetailResponse;
}

export default function OrderDetail(props: propsOrderDetail) {
  const navigate = useNavigate();
  const { toast } = useToast();

  const cancelURL = `/pharmacist/orders/${props.data.id}/cancel`;
  const sendURL = `/pharmacist/orders/${props.data.id}/send`;

  const [open, setOpen] = useState(false);

  const isValidCancel =
    props.data.order_status.name === WAITING_FOR_PAYMENT ||
    props.data.order_status.name === PROCESSED;
  const isValidSend = props.data.order_status.name === PROCESSED;

  const {
    error: errorCancel,
    fetchData: responseCancel,
    isLoading: isLoadingCancel,
  } = useFetch<unknown>(cancelURL, {
    method: "PATCH",
  });

  const {
    error: errorSend,
    fetchData: responseSend,
    isLoading: isLoadingSend,
  } = useFetch<unknown>(sendURL, {
    method: "PATCH",
  });

  const handleOnClickSend = async () => {
    const resp = await responseSend(props.data.id);
    if (resp?.status == SUCCESS_RESPONSE_CODE) navigate(PHARMACIST_ORDER_URL);
    return;
  };

  const handleOnClickCancel = async () => {
    const resp = await responseCancel(props.data.id);
    if (resp?.status == SUCCESS_RESPONSE_CODE) navigate(PHARMACIST_ORDER_URL);
    return;
  };

  useEffect(() => {
    if (errorCancel) {
      toast({
        variant: "destructive",
        title: "Something wrong in your request!!",
        description: errorCancel.error[0].message,
        className: "my-2",
      });
    }
  }, [errorCancel]);

  useEffect(() => {
    if (errorSend) {
      toast({
        variant: "destructive",
        title: "Something wrong in your request!",
        description: errorSend.error[0].message,
        className: "my-2",
      });
    }
  }, [errorSend]);

  const canceButtonlDisabled = () => {
    return isLoadingCancel || !isValidCancel;
  };

  const handleSetOpen = () => {
    setOpen((prev) => !prev);
  };

  return (
    <>
      {(isLoadingCancel || isLoadingSend) && <LoadingScreen />}
      <div className="relative">
        <section className="m-auto mt-10 w-fit max-w-2xl rounded-2xl border p-4 shadow-xl">
          <div className="w-full space-y-2">
            <div className="flex flex-col gap-2">
              <p className="text-lg font-bold">{`Order_${props.data.id}`}</p>
            </div>
            <Separator />
            <OrderDetailField label="Customer" data={props.data.user.name} />
            <OrderDetailField
              label="Shipping Address"
              data={props.data.address.name}
            />
            <OrderDetailField
              label="Shipping Method"
              data={props.data.logistic_partner.name}
            />
            <OrderDetailField
              label="Order Status"
              data={getOrderStatusBadge(props.data.order_status.name)}
            />

            <div className="flex flex-col gap-2">
              <p className="text-lg font-bold">Order Details</p>
            </div>
            <OrderItems data={props.data.order_items} />
            <div className="">
              <div>
                <h2 className="text-lg font-bold">Payment Detail</h2>
                <div className="grid grid-cols-2">
                  <p className="text-slate-600">Payment Method</p>
                  <p className="text-right">Manual Transfer</p>
                  <p className="text-slate-600">Total Product Price</p>
                  <p className="text-right">
                    {`${CURRENCY} ${currencyFormat(Number(props.data.total_price_product))}`}
                  </p>
                  <p className="text-slate-600">Total Shipping Fee</p>
                  <p className="text-right">
                    {`${CURRENCY} ${currencyFormat(Number(props.data.total_price_shipping))}`}
                  </p>
                </div>
                <div className="mt-2 flex justify-between text-xl font-bold text-primBlue">
                  <p>Total Shopping</p>
                  <p>
                    {`${CURRENCY} ${currencyFormat(Number(props.data.total_price_shipping) + Number(props.data.total_price_product))}`}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-10 flex justify-between">
            <BackButton onClick={() => navigate(PHARMACIST_ORDER_URL)} />
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-4">
                <CancelButtonConfirmationModal
                  message="Are you sure to cancel this order?"
                  setOpen={setOpen}
                  handleSetOpen={handleSetOpen}
                  handleCancel={handleOnClickCancel}
                  open={open}
                  disabled={canceButtonlDisabled()}
                />
                <Button
                  className="border-none bg-primBlue hover:bg-primDarkBlue"
                  onClick={handleOnClickSend}
                  disabled={isLoadingSend || !isValidSend}
                >
                  Send Order
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
