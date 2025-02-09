import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { OrderResponse } from "@/models/user/order";
import { useMemo, useState } from "react";
import { currencyFormat } from "@/utils/currencyFormatter";
import TransactionDetail from "./transactionDetail";
import useFetch from "@/hooks/useFetch";
import { PaginatedResponse } from "@/models/jsonResponse";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import DateFormatter from "@/utils/dateFormatter";
import NoOrders from "../../../components/reusables/noOrders";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import LoadingScreen from "@/components/reusables/loadingScreen";

type OrderContentProps = {
  filter: string;
};

type OrderCardProps = {
  order: OrderResponse;
  filter: string;
  isLoading: boolean;
};

export default function OrderContent(props: OrderContentProps) {
  const [page, setPage] = useState<number>(1);

  const url = `/user/orders?filter=${props.filter}&page=${page}&limit=10`;
  const { data, isLoading, error } =
    useFetch<PaginatedResponse<OrderResponse>>(url);

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
      <div>
        {data?.data.entries.map((data) => {
          return (
            <OrderCard
              key={data.id}
              order={data}
              filter={props.filter}
              isLoading={isLoading}
            />
          );
        })}
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

function OrderCard(props: OrderCardProps) {
  const order = props.order;
  const productCatalogs = useMemo(() => {
    if (!order.order_items) {
      return [];
    }
    const result: string[] = [];
    let counter = 0;
    for (
      let j = 0;
      j < (order.order_items?.length ? order.order_items?.length : 3);
      j++
    ) {
      if (counter == 3) {
        result.push(`+${order.order_items.length - counter} more`);
        return result;
      }
      result.push(order.order_items[j].product_name);
      counter++;
    }
    return result;
  }, [order.order_items]);

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
      <Card className="mb-2 w-full">
        <CardHeader className="pb-1">
          <CardDescription>
            <div className="flex justify-between">
              <div>{DateFormatter(props.order.created_at)}</div>
              <Badge>{props.order.status}</Badge>
            </div>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="font-semibold capitalize">
            {props.order.pharmacy_name}
          </p>
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
                  Number(props.order.total_price_product) +
                    Number(props.order.total_price_shipping),
                )}
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          {props.filter === "sent" ? (
            <ButtonConfirmOrder order_id={props.order.id} />
          ) : (
            <></>
          )}
          <TransactionDetail props={props.order} key={props.order.id} />
        </CardFooter>
      </Card>
    </>
  );
}

function ButtonConfirmOrder(props: { order_id: number }) {
  const navigate = useNavigate();
  const url = `/user/orders/${props.order_id}/confirm`;
  const { isLoading, fetchData: requestConfirm } = useFetch<unknown>(url, {
    method: "PATCH",
  });

  const handleConfirm = async () => {
    const resp = await requestConfirm();
    if (resp != undefined) {
      navigate(0);
    }
  };
  return (
    <>
      {isLoading && <LoadingScreen />}
      <Button onClick={handleConfirm}>Confirm</Button>
    </>
  );
}
