import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import updateQueryStringParameter from "@/utils/updateQueryParam";

interface paginationProps {
  numberOfPage: number;
  currentPage: number;
  url: string;
  onClickPagination: (url: string) => void;
}

export function PaginationComp(props: paginationProps) {
  const isPrevAvail = props.currentPage != 1;
  const isNextAvail = props.currentPage < props.numberOfPage;
  const disabledClass = "opacity-65 hover:cursor-default hover:bg-transparent";

  const navigatePage = (targetPage: number) => {
    return props.onClickPagination(
      updateQueryStringParameter(props.url, "page", targetPage),
    );
  };
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            className={isPrevAvail ? "cursor-pointer" : disabledClass}
            onClick={() =>
              isPrevAvail ? navigatePage(props.currentPage - 1) : "#"
            }
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink
            className={props.currentPage == 1 ? "" : "cursor-pointer"}
            onClick={() => {
              const targetPage = !isPrevAvail ? 1 : props.currentPage - 1;
              navigatePage(targetPage);
            }}
            isActive={props.currentPage == 1}
          >
            {!isPrevAvail ? 1 : props.currentPage - 1}
          </PaginationLink>
        </PaginationItem>
        {props.numberOfPage >= 2 && (
          <PaginationItem>
            <PaginationLink
              className={props.currentPage != 1 ? "" : "cursor-pointer"}
              onClick={() => {
                const targetPage = !isPrevAvail ? 2 : props.currentPage;
                navigatePage(targetPage);
              }}
              isActive={props.currentPage != 1}
            >
              {!isPrevAvail ? 2 : props.currentPage}
            </PaginationLink>
          </PaginationItem>
        )}
        {props.numberOfPage >= 3 && isNextAvail && (
          <PaginationItem>
            <PaginationLink
              className={isNextAvail ? "cursor-pointer" : ""}
              onClick={() => {
                const targetPage = !isPrevAvail ? 3 : props.currentPage + 1;
                navigatePage(targetPage);
              }}
            >
              {!isPrevAvail ? 3 : props.currentPage + 1}
            </PaginationLink>
          </PaginationItem>
        )}

        <PaginationItem>
          <PaginationNext
            className={isNextAvail ? "cursor-pointer" : disabledClass}
            onClick={() =>
              isNextAvail ? navigatePage(props.currentPage + 1) : "#"
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
