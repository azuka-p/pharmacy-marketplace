/* eslint-disable @typescript-eslint/no-explicit-any */

import { pageInfo } from "@/models/jsonResponse";
import { PaginationComp } from "@/components/reusables/pagination";

import detailActionIcon from "@/assets/icons/detail-action.svg";
import EmptyData from "@/components/reusables/utils/emptyData";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import TableSkeleton from "./tableSkeleton";
import getOrderStatusBadge from "@/components/reusables/getOrderStatusBadge";
import { CURRENCY } from "@/constants";

const renderData = (
  head: string,
  data: string | number | [] | boolean,
): string | number | boolean | [] | JSX.Element | undefined => {
  switch (head) {
    case "id":
      return `Order_${data}`;
    case "status":
      return getOrderStatusBadge(String(data));
    case "total_price_product":
      return `${CURRENCY} ${data}`;
    default:
      return data;
  }
};

interface tableProps {
  isLoading: boolean;
  headers: Map<string, string>;
  data: any[] | undefined;
  url: string;
  pageInfo: pageInfo | undefined;
  detailAction: boolean;
  onClickPagination: (url: string) => void;
  headerColsNum: number;
}

const actionDetail = (url: string, id: number) => {
  return (
    <a href={`${url}/${id}`}>
      <img src={detailActionIcon} alt="detail action" />
    </a>
  );
};

export default function TablePharmacistOrder(props: tableProps) {
  // To be Implement
  if (props.isLoading) {
    return <TableSkeleton headerCols={props.headerColsNum} />;
  }

  if (
    !props.data ||
    props.data.length === 0 ||
    props.data == undefined ||
    props.pageInfo == undefined
  ) {
    return (
      <>
        <EmptyData />
      </>
    );
  }

  const headers = Object.keys(props.data[0]);
  const numberOfPage =
    Math.floor((props.pageInfo.total_row - 1) / props.pageInfo.limit) + 1;

  return (
    <div className="min-h-96">
      <Table className="mt-5">
        <TableHeader>
          <TableRow>
            {headers.map((value, key) => (
              <TableHead key={key}>{props.headers.get(value)}</TableHead>
            ))}
            {props.detailAction && <TableHead />}
          </TableRow>
        </TableHeader>
        <TableBody>
          {props.data.map((data, key) => (
            <TableRow key={key}>
              {headers.map((head, keyData) => (
                <TableCell
                  className="max-w-40 overflow-auto font-medium"
                  key={keyData}
                >
                  {renderData(head, data[head])}
                </TableCell>
              ))}
              {props.detailAction && (
                <TableCell>{actionDetail(props.url, data.id)}</TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="mt-4">
        <PaginationComp
          numberOfPage={numberOfPage}
          currentPage={props.pageInfo.page}
          url={props.url}
          onClickPagination={props.onClickPagination}
        />
      </div>
    </div>
  );
}
