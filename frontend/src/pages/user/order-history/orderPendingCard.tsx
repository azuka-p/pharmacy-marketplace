import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import TransactionDetailPending from "./transactionPendingDetail";
import { OrderPending } from "@/models/user/order";
import { useMemo, useState } from "react";
import { currencyFormat } from "@/utils/currencyFormatter";
import countTotalProductInOrderGroup from "@/utils/countTotalProductInOrderGroup";
import { Button } from "@/components/ui/button";
import useFetch from "@/hooks/useFetch";
import UploadPayment from "./uploadPayment";
import { useNavigate } from "react-router-dom";
import DateFormatter from "@/utils/dateFormatter";
import { PaginatedResponse } from "@/models/jsonResponse";
import { ChevronLeft, ChevronRight } from "lucide-react";
import NoOrders from "../../../components/reusables/noOrders";
import { Skeleton } from "@/components/ui/skeleton";

export default function OrderContentPending() {
  const [page, setPage] = useState<number>(1);

  const { data, isLoading, error } = useFetch<PaginatedResponse<OrderPending>>(
    `/user/orders/pending?sort_by=created_at&sort_order=&page=${page}&limit=10`,
  );

  const total_row = data?.data.page_info.total_row;
  if (error != null || total_row == 0) {
    return <NoOrders />;
  }

  const limit = data?.data.page_info.limit;
  const numberOfPage = (total_row ? total_row : 0) / (limit ? limit : 0);
  const currentPage = data?.data.page_info.page;
  const isPrevAvail = currentPage != 1;
  const isNextAvail = (currentPage ? currentPage : 1) < numberOfPage;
  return (
    <>
      <div className="flex flex-col gap-3">
        {data &&
          data.data.entries.map((orderPending, key) => (
            <OrderCardPending
              key={key}
              order_group={orderPending}
              isLoading={isLoading}
            />
          ))}
      </div>
      {numberOfPage == 1 ? (
        <div className="mt-3 flex w-full justify-center">
          <div className="flex">
            <Button
              variant={"ghost"}
              onClick={() => {
                setPage((prev) => prev - 1);
              }}
              disabled={!isPrevAvail}
            >
              <ChevronLeft />
              Previous
            </Button>
            <Button
              variant={"ghost"}
              onClick={() => {
                setPage((prev) => prev + 1);
              }}
              disabled={!isNextAvail}
            >
              Next <ChevronRight />
            </Button>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

function OrderCardPending(props: {
  order_group: OrderPending;
  isLoading: boolean;
}) {
  const order_group = props.order_group;
  const pharmacies = useMemo(() => {
    const result: string[] = [];
    for (let key = 0; key < order_group.orders.length; key++) {
      if (key == 2) {
        result.push(`+${order_group.orders.length - 2} more`);
        return result;
      }
      result.push(order_group.orders[key].pharmacy_name);
    }
    return result;
  }, [order_group.orders]);

  const productCatalogs = useMemo(() => {
    const result: string[] = [];
    let counter = 0;
    for (let i = 0; i < order_group.orders.length; i++) {
      for (let j = 0; j < order_group.orders[i].catalogs.length; j++) {
        if (counter == 3) {
          result.push(
            `+${countTotalProductInOrderGroup(order_group.orders) - counter} more`,
          );
          return result;
        }
        result.push(String(order_group.orders[i].catalogs[j].name));
        counter++;
      }
    }
    return result;
  }, [order_group.orders]);

  if (props.isLoading) {
    return (
      <>
        <Card className="mb-2 w-full">
          <CardHeader className="pb-1">
            <CardDescription>
              <div className="flex justify-between">
                <Skeleton className="h-4 w-52 rounded-xl" />
                <Skeleton className="h-4 w-20 rounded-xl" />
              </div>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Skeleton className="h-6 w-52 rounded-xl" />
            <div className="mt-2 flex h-20 w-full justify-between gap-4">
              <div className="w-full gap-3">
                <Skeleton className="my-2 h-6 w-96 rounded-xl" />
                <Skeleton className="my-2 h-6 w-96 rounded-xl" />
              </div>
              <div className="w-[20%] min-w-fit border-l-[1px] p-2 text-right">
                <Skeleton className="my-2 h-4 w-24 rounded-xl" />
                <Skeleton className="my-2 h-6 w-24 rounded-xl" />
              </div>
            </div>
          </CardContent>
          <CardFooter></CardFooter>
        </Card>
      </>
    );
  }
  return (
    <>
      <Card className="w-full">
        <CardHeader className="pb-1">
          <CardDescription>
            <div className="flex justify-between">
              <p>{DateFormatter(order_group.created_at)}</p>
              <Badge>Pending</Badge>
            </div>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="font-semibold capitalize">{pharmacies?.join(", ")} </p>
          <div className="mt-2 flex h-20 w-full justify-between gap-4">
            <div className="flex w-full gap-3">
              <div className="w-full">
                <p className="w-[70%] text-left">
                  {productCatalogs.join(", ")}
                </p>
              </div>
            </div>
            <div className="w-[20%] min-w-fit border-l-[1px] p-2 text-right">
              <p className="text-sm text-slate-400">Shopping total</p>
              <p className="font-bold">
                Rp
                {currencyFormat(
                  Number(order_group.total_price) +
                    Number(order_group.total_shipping_cost),
                )}
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <UploadPayment order_id={order_group.id} />
          <TransactionDetailPending
            key={order_group.id}
            order_group={order_group}
          />
        </CardFooter>
      </Card>
    </>
  );
}
