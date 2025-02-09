import { BackButton } from "@/components/reusables/formButton";
import { adminOrderDetailResponse } from "@/models/adminOrderResponse";

import { useNavigate } from "react-router-dom";

import { OrderItems } from "./orderItems";
import { CURRENCY } from "@/constants";
import { currencyFormat } from "@/utils/currencyFormatter";
import getOrderStatusBadge from "@/components/reusables/getOrderStatusBadge";
import OrderDetailField from "./orderDetailField";
import { Separator } from "@/components/ui/separator";

const ADMIN_ORDER_URL = "/admin/orders";

interface propsOrderDetail {
  data: adminOrderDetailResponse;
}

export default function OrderDetail(props: propsOrderDetail) {
  const navigate = useNavigate();

  return (
    <>
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
            <BackButton onClick={() => navigate(ADMIN_ORDER_URL)} />
          </div>
        </section>
      </div>
    </>
  );
}
