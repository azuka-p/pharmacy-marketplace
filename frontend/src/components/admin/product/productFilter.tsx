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

type dropDownType = {
  Manufacturer: string;
  Classification: string;
  "Product Form": string;
  "Is Active": string;
};

const DROPDOWN_MENU: dropDownType = {
  Manufacturer: "manufacturer_id",
  Classification: "classification_id",
  "Product Form": "form_id",
  "Is Active": "is_actives",
};

const IS_ACTIVE_OPTION: Option[] = [
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

export default function ProductFilter(props: filterProps) {
  let url = location.pathname + location.search;
  const [filterBy, setFilterBy] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [descending, setDescending] = useState(true);

  const { data: manufacturerData } = useFetch<
    PaginatedResponse<adminProductCategoryResponse>
  >("/admin/product-manufacturers");
  const { data: classificationData } = useFetch<
    PaginatedResponse<adminProductCategoryResponse>
  >("/admin/product-classifications");
  const { data: productFormData } = useFetch<
    PaginatedResponse<adminProductCategoryResponse>
  >("/admin/product-forms");

  const manufacturerOption: Option[] | undefined = useMemo(() => {
    return manufacturerData?.data.entries.map((val) => {
      const opt: Option = {
        label: val.name,
        value: String(val.id),
      };
      return opt;
    });
  }, [manufacturerData]);
  const classificationOption: Option[] | undefined = useMemo(() => {
    return classificationData?.data.entries.map((val) => {
      const opt: Option = {
        label: val.name,
        value: String(val.id),
      };
      return opt;
    });
  }, [classificationData]);
  const productFormOption: Option[] | undefined = useMemo(() => {
    return productFormData?.data.entries.map((val) => {
      const opt: Option = {
        label: val.name,
        value: String(val.id),
      };
      return opt;
    });
  }, [productFormData]);

  const [filterOption, setFilterOption] = useState<Option[] | undefined>();

  const handleChangeFilter = (val: string) => {
    if (val == "manufacturer_id") {
      setFilterOption(manufacturerOption);
      return;
    }
    if (val == "classification_id") {
      setFilterOption(classificationOption);
      return;
    }
    if (val == "form_id") {
      setFilterOption(productFormOption);
      return;
    }
    if (val == "is_actives") {
      setFilterOption(IS_ACTIVE_OPTION);
      return;
    }
  };

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
            <SelectValue placeholder="Select Filter" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={"name"}>Name</SelectItem>
            <SelectItem value={"created_at"}>Created At</SelectItem>
            <SelectItem value={"usage"}>Usage</SelectItem>
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
          data={filterOption ? filterOption : []}
          placeholder={"filter value"}
          value={filterValue}
          onSearch={() => {}}
          onSelect={handleOnSelectFilter}
        />

        <p className="w-60 text-center">Filter By</p>
        <Select
          onValueChange={(data) => {
            setFilterBy(data as keyof dropDownType);
            handleChangeFilter(data);
          }}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Filter" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={DROPDOWN_MENU.Manufacturer}>
              Manufacturer
            </SelectItem>
            <SelectItem value={DROPDOWN_MENU["Is Active"]}>
              Is Active
            </SelectItem>
            <SelectItem value={DROPDOWN_MENU.Classification}>
              Classification
            </SelectItem>
            <SelectItem value={DROPDOWN_MENU["Product Form"]}>
              Product Form
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    </>
  );
}
