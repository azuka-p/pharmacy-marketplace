import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import PaymentMethod from "./paymentMethod";
import { CheckoutSummaryProps } from "@/models/user/checkout";
import { currencyFormat } from "@/utils/currencyFormatter";

export default function CheckoutSummary(props: CheckoutSummaryProps) {
  const [paymentMethodChecked, setPaymentMethodChecked] = useState(false);

  const handlePaymentMethodRadio = () => {
    setPaymentMethodChecked((paymentMethodChecked) => !paymentMethodChecked);
  };

  return (
    <Card className="h-min w-[30vw]">
      <CardContent>
        <PaymentMethod onClick={handlePaymentMethodRadio} />
        <div className="grid grid-cols-1 gap-2 border-y-[1px] border-slate-100 py-3">
          <h2 className="text-lg font-bold">Shopping Summary</h2>
          <div className="grid grid-cols-1 gap-1">
            <div className="flex justify-between">
              <p className="text-slate-500">Product Price Total</p>
              <p>Rp{currencyFormat(props.totalPrice)}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-slate-500">Shipping Fee</p>
              <p>Rp{currencyFormat(props.shippingFee)}</p>
            </div>
          </div>
        </div>
        <div className="grid w-full grid-cols-1 gap-2 pt-3">
          <div className="flex justify-between">
            <p>Shopping Total</p>
            <p className="text-lg font-extrabold">
              Rp{currencyFormat(props.totalPrice + props.shippingFee)}
            </p>
          </div>
          <Button
            className="w-full bg-primBlue"
            onClick={props.onSubmit}
            disabled={!paymentMethodChecked || !props.isAllShippingFullfilled}
          >
            Checkout
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
