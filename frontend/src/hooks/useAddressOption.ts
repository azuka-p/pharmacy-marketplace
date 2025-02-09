import { Option } from "@/components/ui/multiple-selector";
import { city, district, province, subDistrict } from "@/models/address";
import { BaseResponse } from "@/models/jsonResponse";
import { useMemo } from "react";

export default function useAddressOption(
  data:
    | BaseResponse<province[]>
    | BaseResponse<city[]>
    | BaseResponse<district[]>
    | BaseResponse<subDistrict[]>
    | undefined,
) {
  return useMemo(() => {
    return data?.data.map((val) => {
      const opt: Option = {
        label: val.name,
        value: String(val.id),
      };
      return opt;
    });
  }, [data]);
}
