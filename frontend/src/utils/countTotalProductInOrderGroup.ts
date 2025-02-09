import { OrderPendingDetail } from "@/models/user/order";

export default function countTotalProductInOrderGroup(
  orderDetail: OrderPendingDetail[],
) {
  let count = 0;
  orderDetail.forEach((order) => {
    order.catalogs.forEach(() => {
      count++;
    });
  });
  return count;
}
