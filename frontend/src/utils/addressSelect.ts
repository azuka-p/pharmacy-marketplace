import addressState from "@/models/addressState";

const handleLocationChange = (
  key: keyof addressState,
  value: string,
  func: React.Dispatch<
    React.SetStateAction<{
      provinceId: string;
      provinceName: string;
      cityId: string;
      cityName: string;
      districtId: string;
      districtName: string;
      subDistrictId: string;
      subDistrictName: string;
    }>
  >,
) => {
  func((prev) => ({
    ...prev,
    [key]: value,
  }));
};

const reSelectProvince = (
  func: (value: React.SetStateAction<addressState>) => void,
) => {
  handleLocationChange("cityId", "", func);
  handleLocationChange("districtId", "", func);
  handleLocationChange("subDistrictId", "", func);
};
const reSelectCity = (
  func: (value: React.SetStateAction<addressState>) => void,
) => {
  handleLocationChange("districtId", "", func);
  handleLocationChange("subDistrictId", "", func);
};

export const onSelectSearchProvince = (
  value: string,
  label: string,
  func: (value: React.SetStateAction<addressState>) => void,
) => {
  handleLocationChange("provinceId", value, func);
  handleLocationChange("provinceName", label, func);
  reSelectProvince(func);
};
export const onSelectSearchCity = (
  value: string,
  label: string,
  func: (value: React.SetStateAction<addressState>) => void,
) => {
  handleLocationChange("cityId", value, func);
  handleLocationChange("cityName", label, func);
  reSelectCity(func);
};
export const onSelectSearchDistrict = (
  value: string,
  label: string,
  func: (value: React.SetStateAction<addressState>) => void,
) => {
  handleLocationChange("districtId", value, func);
  handleLocationChange("districtName", label, func);
  handleLocationChange("subDistrictId", "", func);
};
export const onSelectSearchSubDistrict = (
  value: string,
  label: string,
  func: (value: React.SetStateAction<addressState>) => void,
) => {
  handleLocationChange("subDistrictId", value, func);
  handleLocationChange("subDistrictName", label, func);
};
