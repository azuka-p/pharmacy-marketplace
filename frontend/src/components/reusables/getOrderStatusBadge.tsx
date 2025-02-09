import {
  CANCELED,
  ORDER_CONFIRMED,
  PROCESSED,
  SENT,
  WAITING_FOR_PAYMENT,
  VERIFYING,
} from "@/constants";
import { Badge } from "../ui/badge";

const StatusBadge = new Map([
  [
    WAITING_FOR_PAYMENT,
    <Badge className="w-[120px] justify-center rounded-full bg-cyan-500 py-2 text-center hover:bg-cyan-500">
      Waiting For Payment
    </Badge>,
  ],
  [
    PROCESSED,
    <Badge className="w-[120px] justify-center rounded-full bg-green-500 py-2 text-center hover:bg-green-500">
      Processed
    </Badge>,
  ],
  [
    SENT,
    <Badge className="w-[120px] justify-center rounded-full bg-amber-400 py-2 text-center hover:bg-amber-400">
      Sent
    </Badge>,
  ],
  [
    ORDER_CONFIRMED,
    <Badge className="w-[120px] justify-center rounded-full bg-lime-600 py-2 text-center hover:bg-lime-600">
      Order Confirmed
    </Badge>,
  ],
  [
    CANCELED,
    <Badge className="w-[120px] justify-center rounded-full bg-rose-600 py-2 text-center hover:bg-rose-600">
      Canceled
    </Badge>,
  ],
  [
    VERIFYING,
    <Badge className="w-[120px] justify-center rounded-full bg-teal-500 py-2 text-center hover:bg-teal-500">
      Verifying
    </Badge>,
  ],
]);

function getOrderStatusBadge(value: string) {
  return StatusBadge.get(value);
}

export default getOrderStatusBadge;
