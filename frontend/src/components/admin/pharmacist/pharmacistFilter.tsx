import { SearchSelector } from "@/components/reusables/searchSelector";
import { useMemo, useState } from "react";
import { Option } from "@/components/ui/multiple-selector";
import useFetch from "@/hooks/useFetch";
import { PaginatedResponse } from "@/models/jsonResponse";
import { adminProductCategoryResponse } from "@/models/adminProductCategoryResponse";
import updateQueryStringParameter from "@/utils/updateQueryParam";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import sortIcon from "../../../assets/icons/sort.svg";

const ASSIGNED_OPTION: Option[] = [
  {
    value: "True",
    label: "True",
  },
  {
    value: "False",
    label: "False",
  },
];

interface filterProps {
  onSelect: (url: string) => void;
}

export default function PharmacistFilter(props: filterProps) {
  let url = location.pathname + location.search;
  const [filterBy, setFilterBy] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [descending, setDescending] = useState(true);

  const handleOnSelectFilter = (value: string) => {
    setFilterValue(value);
    url = updateQueryStringParameter(url, "filter_by", filterBy ?? "");
    url = updateQueryStringParameter(
      url,
      "sort_order",
      descending ? "desc" : "asc",
    );
    props.onSelect(updateQueryStringParameter(url, "filter_value", value));
  };

  const handleOnSelectSort = (sort: boolean) => {
    setFilterValue(filterValue);
    url = updateQueryStringParameter(url, "filter_by", filterBy ?? "");
    url = updateQueryStringParameter(url, "sort_order", sort ? "desc" : "asc");
    props.onSelect(
      updateQueryStringParameter(url, "filter_value", filterValue),
    );
  };

  return (
    <>
      <div className="flex w-fit gap-1">
        <Select
          onValueChange={(sortBy) => {
            props.onSelect(updateQueryStringParameter(url, "sort_by", sortBy));
          }}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={"name"}>Name</SelectItem>
            <SelectItem value={"created_at"}>Created At</SelectItem>
          </SelectContent>
        </Select>
        <img
          src={sortIcon}
          onClick={() => {
            handleOnSelectSort(!descending);
            setDescending((descending) => !descending);
          }}
          className="w-8 hover:cursor-pointer"
        />
      </div>

      <div className="flex items-center">
        <SearchSelector
          data={ASSIGNED_OPTION}
          placeholder={"filter value"}
          value={filterValue}
          onSearch={() => {}}
          onSelect={handleOnSelectFilter}
        />
        <p className="w-60 text-center">Filter By</p>
        <Select>
          <SelectTrigger>
            <SelectValue
              className="w-fit"
              defaultValue={"assigned"}
              placeholder="Select Filter"
            >
              Assigned
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="assigned">Assigned</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </>
  );
}
