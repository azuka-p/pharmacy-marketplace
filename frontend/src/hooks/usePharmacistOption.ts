import { Option } from "@/components/ui/multiple-selector";
import { adminPharmacistResponse } from "@/models/adminPharmacistResponse";
import { useMemo } from "react";

export default function usePharmacistOption(
  data: adminPharmacistResponse[] | undefined,
) {
  return useMemo(() => {
    return data?.map((val) => {
      const opt: Option = {
        label: val.name,
        value: String(val.id),
      };
      return opt;
    });
  }, [data]);
}
