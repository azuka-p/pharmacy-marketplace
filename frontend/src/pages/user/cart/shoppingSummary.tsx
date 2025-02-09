import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CartGroupPharmacy } from "@/models/user/cart";
import { currencyFormat } from "@/utils/currencyFormatter";

import { useNavigate } from "react-router-dom";

interface shoppingSummaryProps {
  // totalProduct: CartGroupPharmacy[] | undefined;
  totalPrice: number;
  canCheckout: boolean;
}

export default function ShoppingSummary(props: shoppingSummaryProps) {
  const navigate = useNavigate();

  return (
    <>
      <Card className="h-min w-[30vw]">
        <CardHeader>
          <CardTitle className="text-lg">Shopping Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between border-y-[1px] border-slate-100 py-5">
            <p>Total</p>
            <p className="font-extrabold">
              Rp{currencyFormat(props.totalPrice)}
            </p>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            className="w-full"
            onClick={() => navigate("/user/checkout")}
            disabled={!props.canCheckout}
          >
            Buy
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}
