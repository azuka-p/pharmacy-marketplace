import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { memo } from "react";

interface TableSkeletonProps {
  headerCols: number;
}

const TableSkeleton = (props: TableSkeletonProps) => {
  return (
    <>
      <Table className="mt-5">
        <TableHeader className="h-12">
          <TableRow>
            {Array.from({ length: props.headerCols }, (_, key) =>
              key == 0 ? (
                <TableHead className="w-1/6" key={key}>
                  <Skeleton className="h-10 w-full rounded-sm" />
                </TableHead>
              ) : (
                <TableHead className="" key={key}>
                  <Skeleton className="h-10 w-full rounded-sm" />
                </TableHead>
              ),
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 8 }, (_, key) => (
            <TableRow key={key}>
              {Array.from({ length: props.headerCols }, (_, key) => (
                <TableHead key={key}>
                  <Skeleton className="h-6 w-full" />
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default memo(TableSkeleton);
