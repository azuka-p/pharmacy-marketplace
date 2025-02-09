import { z } from "zod";
import { Form } from "../../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useFetch from "@/hooks/useFetch";
import { CancelButton, SubmitButton } from "../../reusables/formButton";
import { useNavigate } from "react-router-dom";
import { PaginatedResponse } from "@/models/jsonResponse";
import { useEffect, useState } from "react";
import { Option } from "../../ui/multiple-selector";
import { SearchSelector } from "../../reusables/searchSelector";
import { city, district, province } from "@/models/address";
import { adminPartnerResponse } from "@/models/adminPartnerResponse";
import { adminPharmacistResponse } from "@/models/adminPharmacistResponse";
import MultipleSearchSelector from "@/components/reusables/multipleSearchSelector";
import FieldForm from "../form/fieldForm";
import logisticResponse from "@/models/logisticResponse";
import { pharmacyFormSchemaCreate } from "./form/formSchemaCreate";
import usePartnerOption from "@/hooks/usePartnerOption";
import useLogisticOption from "@/hooks/useLogisticOption";
import usePharmacistOption from "@/hooks/usePharmacistOption";
import useAddressOption from "@/hooks/useAddressOption";
import {
  onSelectSearchCity,
  onSelectSearchDistrict,
  onSelectSearchProvince,
  onSelectSearchSubDistrict,
} from "@/utils/addressSelect";
import PharmacyCreateField from "./form/pharmacyCreateFormInput";
import AddressField from "./form/address/addressFormInput";
import MapComponent from "@/components/reusables/map";
import { LatLng } from "leaflet";
import UploadImage from "@/components/reusables/uploadImage";
import { PhoneInput } from "@/components/reusables/phoneNumberInput";
import { ToastAction } from "@radix-ui/react-toast";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { addressSchema } from "./form/address/addressFormSchema";
import { Switch } from "@/components/ui/switch";

export default function CreatePharmacy() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof pharmacyFormSchemaCreate>>({
    resolver: zodResolver(pharmacyFormSchemaCreate),
    mode: "onChange",
  });
  const formAddress = useForm<z.infer<typeof addressSchema>>({
    resolver: zodResolver(addressSchema),
    mode: "onChange",
  });

  const [imageState, setImageState] = useState("");
  const [partnerParam, setPartnerParam] = useState("");
  const [pharmacistParam, setPharmacistParam] = useState("");
  const [pharmacistSelected, setPharmacistSelected] = useState<number[]>([]);
  const [coordinates, setCoordinates] = useState<LatLng>(
    new LatLng(-6.1762581, 106.8229916),
  );
  const [logisticSelected, setLogisticSelected] = useState<number[]>([]);
  const [partnerId, setPartnerId] = useState("");
  const [locationState, setLocationState] = useState({
    provinceId: "",
    provinceName: "",
    cityId: "",
    cityName: "",
    districtId: "",
    districtName: "",
    subDistrictId: "",
    subDistrictName: "",
  });

  const { error, fetchData: responsePost } = useFetch<unknown, FormData>(
    "/admin/pharmacies",
    {
      method: "POST",
    },
  );
  const { data: partnerData } = useFetch<
    PaginatedResponse<adminPartnerResponse>
  >("/admin/partners?search_value=" + partnerParam);
  const { data: provinceData } = useFetch<province[]>("/provinces");
  const { data: cityData } = useFetch<city[]>(
    "/cities/" + locationState.provinceId,
  );
  const { data: districtData } = useFetch<district[]>(
    "/districts/" + locationState.cityId,
  );
  const { data: subDistrictData } = useFetch<district[]>(
    "/subdistricts/" + locationState.districtId,
  );
  const { fetchData: coorReq } = useFetch<unknown, FormData>("/user/address", {
    method: "POST",
  });
  const { error: errGetCoor, fetchData: addrReq } = useFetch<unknown, FormData>(
    "/user/coordinate",
    {
      method: "POST",
    },
  );
  const { data: pharmacistData } = useFetch<
    PaginatedResponse<adminPharmacistResponse>
  >("/admin/pharmacists?assigned=false&search_value=" + pharmacistParam);
  const { data: logisticData } =
    useFetch<logisticResponse[]>("/logistic-partners");

  const partnerOptions: Option[] | undefined = usePartnerOption(
    partnerData?.data.entries,
  );
  const provinceOption: Option[] | undefined = useAddressOption(provinceData);
  const cityOption: Option[] | undefined = useAddressOption(cityData);
  const districtOption: Option[] | undefined = useAddressOption(districtData);
  const subDistrictOption: Option[] | undefined =
    useAddressOption(subDistrictData);

  const pharmacistOptions: Option[] | undefined = usePharmacistOption(
    pharmacistData?.data.entries,
  );

  const logisticOptions: Option[] | undefined = useLogisticOption(
    logisticData?.data,
  );

  const onClickSearchPartner = (value: string) => {
    setPartnerParam(value);
  };
  const onSelectSearchPartner = (value: string) => {
    setPartnerId(value);
    form.setValue("partner_id", Number(value));
    form.trigger("partner_id");
  };

  const onClickSearchPharmacist = (value: string) => {
    setPharmacistParam(value);
  };
  const onSelectSearchPharmacist = (datas: Option[]) => {
    setPharmacistSelected(() => {
      return datas.map((val) => {
        return parseInt(val.value);
      });
    });
  };
  const onSelectSearchLogistic = (datas: Option[]) => {
    setLogisticSelected(() => {
      return datas.map((val) => {
        return parseInt(val.value);
      });
    });
  };

  const handleGetCoordinate = async (subDistrict: string) => {
    const formData = new FormData();
    const addressRequest = {
      city: locationState.cityName,
      province: locationState.provinceName,
      district: locationState.districtName,
      subdistrict: subDistrict,
    };
    formData.append("address", JSON.stringify(addressRequest));
    const resp = await addrReq(formData);
    if (resp?.data != undefined) {
      const coorResult = new LatLng(
        resp.data.data.Latitude,
        resp.data.data.Longitude,
      );
      setCoordinates(coorResult);
      formAddress.setValue("latitude", coorResult.lat);
      formAddress.setValue("longitude", coorResult.lng);
      formAddress.trigger(["latitude", "longitude"]);
    }
  };

  const handleUseMyLocation = async (c: LatLng) => {
    setCoordinates(c);
    const formData = new FormData();
    formData.append(
      "coordinate",
      JSON.stringify({ latitude: c.lat, longitude: c.lng }),
    );
    const resp = await coorReq(formData);
    if (resp?.data != undefined) {
      setLocationState({
        provinceId: "",
        provinceName: resp.data.data.province,
        cityId: "",
        cityName: resp.data.data.city,
        districtId: "",
        districtName: resp.data.data.district,
        subDistrictId: "",
        subDistrictName: resp.data.data.subdistrict,
      });
      formAddress.setValue("province", resp.data.data.province);
      formAddress.setValue("city", resp.data.data.city);
      formAddress.setValue("district", resp.data.data.district);
      formAddress.setValue("subdistrict", resp.data.data.subdistrict);
      formAddress.setValue("latitude", c.lat);
      formAddress.setValue("longitude", c.lng);
      formAddress.trigger([
        "province",
        "city",
        "district",
        "subdistrict",
        "latitude",
        "longitude",
      ]);
      toast({
        title: "Autofullfilled address using current location",
        className: "my-2",
      });
    }
  };

  const handleOnUploadedImage = (url: string) => {
    setImageState(url);
    form.setValue("logo", url);
    form.trigger("logo");
  };

  const handleOnSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const formData = new FormData(ev.currentTarget);
    formData.append("address", JSON.stringify(formAddress.getValues()));
    pharmacistSelected.forEach((p) =>
      formData.append("pharmacists[]", JSON.stringify(p)),
    );
    logisticSelected.forEach((l) =>
      formData.append("logistic_partners[]", JSON.stringify(l)),
    );

    const resp = await responsePost(formData);
    if (resp?.status == 200) {
      toast({
        title: "Successfully Created Pharmacy",
        className: "my-2",
      });
      navigate("/admin/pharmacies");
    }
    return;
  };

  useEffect(() => {
    if (error != undefined) {
      toast({
        variant: "destructive",
        title: "Something went wrong",
        description: error.error[0].message,
        className: "my-2",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
      return;
    }
    if (errGetCoor != undefined) {
      toast({
        variant: "destructive",
        title: "Something went wrong",
        description:
          "Cannot get coordinate from inputted address, try 'use my location' or change address instead",
        className: "my-2",
      });
    }
  }, [errGetCoor, error, toast]);

  return (
    <section className="m-auto mt-10 w-fit max-w-2xl rounded-2xl border p-4 shadow-xl">
      <Toaster />
      <Form {...form}>
        <form
          id="form"
          action="submit"
          onSubmit={(e) => handleOnSubmit(e)}
          className="w-full space-y-2"
        >
          <PharmacyCreateField
            label="Name"
            control={form.control}
            name={"name"}
            mandatory={true}
          />
          <PharmacyCreateField
            label="Logo"
            control={form.control}
            name={"logo"}
            mandatory={true}
            hidden={true}
          >
            <div className="flex items-center gap-2">
              {imageState && (
                <img src={imageState} width={"60px"} height={"60px"} alt="" />
              )}
              <UploadImage
                setUploadedImage={handleOnUploadedImage}
                isUploaded={imageState != ""}
              />
            </div>
          </PharmacyCreateField>
          <PharmacyCreateField
            label="Partner"
            control={form.control}
            name={"partner_id"}
            mandatory={true}
            hidden={true}
          >
            <SearchSelector
              onSelect={onSelectSearchPartner}
              data={partnerOptions ? partnerOptions : []}
              placeholder="Partner"
              value={partnerId}
              onSearch={onClickSearchPartner}
            />
          </PharmacyCreateField>
          <FieldForm label="Pharmacist">
            <MultipleSearchSelector
              editMode={true}
              options={pharmacistOptions ? pharmacistOptions : []}
              onSearch={onClickSearchPharmacist}
              searchPlaceholder={"Select Pharmacist"}
              onSelect={onSelectSearchPharmacist}
            />
          </FieldForm>
          <FieldForm label="Logistic" mandatory={true}>
            <MultipleSearchSelector
              editMode={true}
              options={logisticOptions ? logisticOptions : []}
              onSearch={() => {}}
              searchPlaceholder={"Select Logistic"}
              onSelect={onSelectSearchLogistic}
            />
          </FieldForm>
          <PharmacyCreateField
            label="Active Status"
            mandatory={true}
            name={"is_active"}
            control={form.control}
            hidden={true}
          >
            <Switch
              checked={form.getValues("is_active") == 1}
              onCheckedChange={(e) => {
                form.setValue("is_active", e ? 1 : 0);
                form.trigger("is_active");
              }}
            />
          </PharmacyCreateField>
        </form>
      </Form>

      <Form {...formAddress}>
        <form action="submit" className="mt-2 w-full space-y-2">
          <AddressField
            label="Phone Number"
            control={formAddress.control}
            name={"phone_number"}
            mandatory={true}
            hidden={true}
          >
            <PhoneInput
              defaultCountry="ID"
              onChange={(e) => {
                formAddress.setValue("phone_number", e.toString());
                formAddress.trigger("phone_number");
              }}
            />
          </AddressField>

          <AddressField
            label="Province"
            control={formAddress.control}
            name={"province"}
            mandatory={true}
            hidden={true}
          >
            <SearchSelector
              onSelect={(val, label) => {
                onSelectSearchProvince(val, label, setLocationState);
                formAddress.setValue("province", label);
                formAddress.trigger("province");
              }}
              defaultValue={locationState.provinceName}
              data={provinceOption ? provinceOption : []}
              placeholder={"Province"}
              value={locationState.provinceId}
              onSearch={() => {}}
            />
          </AddressField>

          <AddressField
            label="City"
            control={formAddress.control}
            name={"city"}
            mandatory={true}
            hidden={true}
          >
            <SearchSelector
              onSelect={(val, label) => {
                onSelectSearchCity(val, label, setLocationState);
                formAddress.setValue("city", label);
                formAddress.trigger("city");
              }}
              defaultValue={locationState.cityName}
              data={cityOption ? cityOption : []}
              placeholder={"City"}
              value={locationState.cityId}
              onSearch={() => {}}
              disabled={locationState.provinceId == ""}
            />
          </AddressField>

          <AddressField
            label="District"
            control={formAddress.control}
            name={"district"}
            mandatory={true}
            hidden={true}
          >
            <SearchSelector
              onSelect={(val, label) => {
                onSelectSearchDistrict(val, label, setLocationState);
                formAddress.setValue("district", label);
              }}
              defaultValue={locationState.districtName}
              data={districtOption ? districtOption : []}
              placeholder={"District"}
              value={locationState.districtId}
              onSearch={() => {}}
              disabled={locationState.cityId == ""}
            />
          </AddressField>

          <AddressField
            label="Sub-District"
            control={formAddress.control}
            name={"subdistrict"}
            mandatory={true}
            hidden={true}
          >
            <SearchSelector
              onSelect={(val, label) => {
                onSelectSearchSubDistrict(val, label, setLocationState);
                formAddress.setValue("subdistrict", label);
                formAddress.trigger("subdistrict");
                handleGetCoordinate(label);
              }}
              defaultValue={locationState.subDistrictName}
              data={subDistrictOption ? subDistrictOption : []}
              placeholder={"Sub-District"}
              value={locationState.subDistrictId}
              onSearch={() => {}}
              disabled={locationState.districtId == ""}
            />
          </AddressField>

          <AddressField
            label="Address Detail"
            control={formAddress.control}
            name={"name"}
            mandatory={true}
          />

          <AddressField
            label="Postal Code"
            control={formAddress.control}
            name={"postal_code"}
            mandatory={true}
            type="number"
          />

          <AddressField
            control={formAddress.control}
            name={"latitude"}
            hiddenField={true}
          />

          <AddressField
            control={formAddress.control}
            name="longitude"
            hiddenField={true}
          />

          <MapComponent
            editMode={true}
            coordinates={coordinates}
            setCoordinates={handleUseMyLocation}
          />
        </form>
      </Form>

      <div className="mt-10 flex justify-between">
        <CancelButton onClick={() => navigate("/admin/pharmacies")} />
        <SubmitButton
          form="form"
          disabled={!form.formState.isValid || !formAddress.formState.isValid}
        />
      </div>
    </section>
  );
}
