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

type OrderContentProps = {
  filter: string;
};

type OrderCardProps = {
  order: OrderResponse;
  filter: string;
};

export default function OrderPagination(
  props: OrderContentProps,
  children: JSX.Element,
) {
  const [page, setPage] = useState<number>(1);

  const url = `/user/orders?filter=${props.filter}&page=${page}&limit=10`;
  const { data } = useFetch<PaginatedResponse<OrderResponse>>(url);

  const total_row = data?.data.page_info.total_row;
  const limit = data?.data.page_info.limit;
  const numberOfPage = (total_row ? total_row : 0) / (limit ? limit : 0);
  const currentPage = data?.data.page_info.page;
  const isPrevAvail = currentPage != 1;
  const isNextAvail = (currentPage ? currentPage : 1) < numberOfPage;
  return (
    <>
      {children}
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
    </>
  );
}
