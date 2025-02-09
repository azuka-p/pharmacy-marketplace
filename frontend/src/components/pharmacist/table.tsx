import { pageInfo } from "@/models/jsonResponse";
import EmptyData from "@/components/reusables/utils/emptyData";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PaginationComp } from "@/components/reusables/pagination";
import TableSkeleton from "./order/tableSkeleton";
import { Switch } from "../ui/switch";
import editIcon from "../../assets/icons/edit-black.svg";
import { Link } from "react-router-dom";

const renderData = (
  data: string | number | undefined,
): string | number | JSX.Element => {
  if (data == undefined) {
    return "Null";
  }
  if (typeof data == "boolean") {
    if (data) {
      return <Switch checked={true} disabled aria-readonly />;
    }
    return <Switch checked={false} disabled aria-readonly />;
  }
  return data;
};

interface tableProps {
  isLoading: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[] | undefined;
  url: string;
  pageInfo: pageInfo | undefined;
  detailAction: boolean;
  onClickPagination: (url: string) => void;
  headerColsNum: number;
}

const actionDetail = (id: number) => {
  return (
    <Link to={`${id}`}>
      <img width={"25px"} height={"40px"} src={editIcon} alt="detail action" />
    </Link>
  );
};

export default function TablePharmacist(props: tableProps) {
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
    <>
      <Table className="mt-5">
        <TableHeader>
          <TableRow>
            {headers.slice(1).map((value, key) => (
              <TableHead key={key}>{value}</TableHead>
            ))}
            {props.detailAction && <TableHead />}
          </TableRow>
        </TableHeader>
        <TableBody>
          {props.data.map((data, key) => (
            <TableRow key={key}>
              {headers.slice(1).map((head, keyData) => {
                return (
                  <TableCell
                    className="max-w-40 overflow-auto font-medium"
                    key={keyData}
                  >
                    {renderData(data[head])}
                  </TableCell>
                );
              })}
              {props.detailAction && (
                <TableCell>{actionDetail(data.id)}</TableCell>
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
    </>
  );
}
