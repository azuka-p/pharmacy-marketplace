import { Option } from "@/components/ui/multiple-selector";
import { adminPartnerResponse } from "@/models/adminPartnerResponse";
import { useMemo } from "react";

export default function usePartnerOption(
  data: adminPartnerResponse[] | undefined,
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
