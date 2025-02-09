import { Option } from "@/components/ui/multiple-selector";
import logisticResponse from "@/models/logisticResponse";
import { useMemo } from "react";

export default function useLogisticOption(
  data: logisticResponse[] | undefined,
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
