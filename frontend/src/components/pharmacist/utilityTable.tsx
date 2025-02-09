import { useState } from "react";
import SearchInput from "../reusables/searchInput";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface utilityTableProps {
  addButton?: string;
  onAdd: () => void;
  filters?: JSX.Element;
  searchBy: { label: string; value: string }[];
  onSearch: (url: string) => void;
  searchPlaceHolder?: string;
}

export default function UtilityTable(props: utilityTableProps) {
  const [searchByState, setSearchByState] = useState(
    props.searchBy[0] ? props.searchBy[0].value : undefined,
  );

  return (
    <div
      className={`flex ${props.addButton ? "justify-between" : "justify-end"}`}
    >
      {props.addButton && (
        <Button onClick={props.onAdd} children={props.addButton} />
      )}

      <div className="flex gap-16">
        {props.filters}
        <div className="flex h-10 items-center gap-2">
          <SearchInput
            handleReFetch={props.onSearch}
            className="w-fit min-w-40"
            searchBy={searchByState}
            searchPlaceholder={
              props.searchPlaceHolder ? props.searchPlaceHolder : "Search"
            }
          />
          {searchByState && (
            <>
              <h2>By</h2>
              <Select onValueChange={(e) => setSearchByState(e)}>
                <SelectTrigger className="w-full">
                  <SelectValue
                    defaultValue={props.searchBy[0].value}
                    placeholder="Select Search"
                  >
                    {props.searchBy[0].label}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {props.searchBy.map((v, key) => (
                    <SelectItem value={v.value} key={key}>
                      {v.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
