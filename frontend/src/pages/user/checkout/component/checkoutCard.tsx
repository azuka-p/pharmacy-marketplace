import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { currencyFormat } from "@/utils/currencyFormatter";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useFetch from "@/hooks/useFetch";
import {
  CheckoutCardProps,
  OrderPharmacyDetail,
  ShippingCostRequest,
  ShippingCostResponse,
} from "@/models/user/checkout";
import { useEffect, useState } from "react";

export default function CheckoutCard(props: CheckoutCardProps) {
  const [selectedLogisticPrice, setSelectedLogisticPrice] = useState<number>();

  const { data, fetchData } = useFetch<
    ShippingCostResponse,
    ShippingCostRequest
  >("/user/carts/shipping-cost", { method: "POST" });

  const handleOnSelectLogistic = (cost: number, logiId: number) => {
    setSelectedLogisticPrice(Number(cost));

    if (selectedLogisticPrice == undefined) {
      if (props.orderPharmacyDetails == undefined) {
        const orderPharmacyDetails: OrderPharmacyDetail[] = [
          {
            pharmacy_id: props.pharmacy.id,
            logistic_partner_id: logiId,
          },
        ];
        props.onSelect(cost, orderPharmacyDetails);
        return;
      }
      let isChecked = false;
      const orderPharmacyDetails = props.orderPharmacyDetails?.map((detail) => {
        if (detail.pharmacy_id == props.pharmacy.id) {
          detail.logistic_partner_id = logiId;
          isChecked = true;
          return detail;
        }
        return detail;
      });
      if (!isChecked) {
        const newDetail: OrderPharmacyDetail = {
          logistic_partner_id: logiId,
          pharmacy_id: props.pharmacy.id,
        };
        orderPharmacyDetails.push(newDetail);
      }
      props.onSelect(cost, orderPharmacyDetails);
    }

    if (selectedLogisticPrice != undefined) {
      if (props.orderPharmacyDetails == undefined) {
        const orderPharmacyDetails: OrderPharmacyDetail[] = [
          {
            pharmacy_id: props.pharmacy.id,
            logistic_partner_id: logiId,
          },
        ];
        props.onSelect(cost - selectedLogisticPrice, orderPharmacyDetails);
        return;
      }

      let isChecked = false;
      const orderPharmacyDetails = props.orderPharmacyDetails?.map((detail) => {
        if (detail.pharmacy_id == props.pharmacy.id) {
          detail.logistic_partner_id = logiId;
          isChecked = true;
          return detail;
        }

        return detail;
      });
      if (!isChecked) {
        const newDetail: OrderPharmacyDetail = {
          logistic_partner_id: logiId,
          pharmacy_id: props.pharmacy.id,
        };
        orderPharmacyDetails.push(newDetail);
      }
      props.onSelect(cost - selectedLogisticPrice, orderPharmacyDetails);
    }
  };

  useEffect(() => {
    if (props.address_id)
      fetchData({
        address_id: props.address_id,
        pharmacy_id: props.pharmacy.id,
      });
  }, [fetchData, props.address_id, props.pharmacy.id]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="capitalize">{props.pharmacy.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <section className="flex flex-col gap-4">
          {props.catalogs.map((data, key) => {
            return (
              <div key={key} className="flex w-full items-center gap-4">
                <img
                  src={data.product.image}
                  className="h-full w-20 rounded-md border-[1px] border-slate-50"
                />
                <div className="flex w-full justify-between">
                  <p className="w-[80%] text-left">{data.product.name}</p>
                  <p className="mb-4 w-[20%] text-right font-bold">
                    {data.quantity} x Rp{currencyFormat(Number(data.price))}
                  </p>
                </div>
              </div>
            );
          })}
        </section>
        <section className="mt-4">
          <Select
            onValueChange={(data) => {
              const splittedData = data.split(",");
              handleOnSelectLogistic(
                Number(splittedData[0]),
                Number(splittedData[1]),
              );
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select shipping method" />
            </SelectTrigger>
            <SelectContent>
              {data?.data.costs.map((logi) => (
                <SelectItem key={logi.name} value={`${logi.cost},${logi.id}`}>
                  {logi.name} - {currencyFormat(Number(logi.cost))}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </section>
      </CardContent>
    </Card>
  );
}
