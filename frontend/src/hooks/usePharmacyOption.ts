import { Option } from "@/components/ui/multiple-selector";
import { adminPharmacyResponse } from "@/models/adminPharmacyResponse";
import { useMemo } from "react";

export default function usePharmacyOption(
  data: adminPharmacyResponse[] | undefined,
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
