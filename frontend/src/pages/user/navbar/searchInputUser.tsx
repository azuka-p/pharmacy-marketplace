import { Input } from "../../../components/ui/input";
import OnEnterKey from "../../../utils/onEnter";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";

export default function SearchInputUser() {
  const navigate = useNavigate();
  return (
    <div className="relative w-full">
      <Input
        onKeyDown={(e) => {
          OnEnterKey(e, () => {
            navigate(
              `/user/catalogs?search_by=name&search_value=${e.currentTarget.value}`,
            );
            navigate(0);
          });
        }}
        className="indent-5"
        placeholder={"Search product"}
      />
      <div>
        <Search className="absolute bottom-2 left-0 h-5 w-9 stroke-gray-400" />
      </div>
    </div>
  );
}
