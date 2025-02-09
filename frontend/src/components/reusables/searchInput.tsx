import { Input } from "../ui/input";
import searchIcon from "../../assets/icons/search.svg";
import OnEnterKey from "../../utils/onEnter";
import { useNavigate } from "react-router-dom";
import updateQueryStringParameter from "@/utils/updateQueryParam";

interface searchProps {
  searchBy?: string;
  searchPlaceholder?: string;
  className?: string;
  handleReFetch?: (url: string) => void;
}

export default function SearchInput(props: searchProps) {
  const navigate = useNavigate();
  const url = window.location.pathname;
  const urlParams = new URLSearchParams(window.location.search);
  const searchParam = urlParams.get("search_value");
  return (
    <div className={`relative flex items-center ${props.className}`}>
      <img className="absolute left-2 h-4/5" src={searchIcon} alt="" />
      <Input
        defaultValue={searchParam ? searchParam : ""}
        onKeyDown={(e) => {
          OnEnterKey(e, () => {
            if (props.handleReFetch) {
              let searchUrl = updateQueryStringParameter(
                url,
                "search_by",
                props.searchBy ?? "",
              );
              searchUrl = updateQueryStringParameter(
                searchUrl,
                "search_value",
                e.currentTarget.value,
              );
              props.handleReFetch(searchUrl);
              return;
            }
            navigate(
              `${url}?search_by=${props.searchBy ? props.searchBy : ""}&search_value=${e.currentTarget.value}`,
            );
            navigate(0);
          });
        }}
        className="indent-8"
        placeholder={
          props.searchPlaceholder ? props.searchPlaceholder : "Search"
        }
      />
    </div>
  );
}
