import { z } from "zod";
import { Form } from "../../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useFetch from "@/hooks/useFetch";
import {
  BackButton,
  CancelButton,
  EditButton,
  SubmitButton,
} from "../../reusables/formButton";
import { useNavigate } from "react-router-dom";
import { PaginatedResponse } from "@/models/jsonResponse";
import { useEffect, useMemo, useState } from "react";
import { Option } from "../../ui/multiple-selector";
import { SearchSelector } from "../../reusables/searchSelector";
import { city, district, province } from "@/models/address";
import { adminPartnerResponse } from "@/models/adminPartnerResponse";
import { adminPharmacistResponse } from "@/models/adminPharmacistResponse";
import MultipleSearchSelector from "@/components/reusables/multipleSearchSelector";
import FieldForm from "../form/fieldForm";
import logisticResponse from "@/models/logisticResponse";
import { adminPharmacyDetail } from "@/models/adminPharmacyResponse";
import { pharmacyFormSchemaCreate } from "./form/formSchemaCreate";
import usePartnerOption from "@/hooks/usePartnerOption";
import useAddressOption from "@/hooks/useAddressOption";
import usePharmacistOption from "@/hooks/usePharmacistOption";
import useLogisticOption from "@/hooks/useLogisticOption";
import { LatLng } from "leaflet";
import { useToast } from "@/hooks/use-toast";
import { addressSchema } from "./form/address/addressFormSchema";
import PharmacyCreateField from "./form/pharmacyCreateFormInput";
import UploadImage from "@/components/reusables/uploadImage";
import AddressField from "./form/address/addressFormInput";
import {
  onSelectSearchCity,
  onSelectSearchDistrict,
  onSelectSearchProvince,
  onSelectSearchSubDistrict,
} from "@/utils/addressSelect";
import MapComponent from "@/components/reusables/map";
import { PhoneInput } from "@/components/reusables/phoneNumberInput";
import { Switch } from "@/components/ui/switch";
import DeleteButtonConfirmationModal from "@/components/reusables/DeleteButtonConfirmationModal";
import { ToastAction } from "@/components/ui/toast";
import LoadingScreen from "@/components/reusables/loadingScreen";

interface pharmacyDetailProps {
  data: adminPharmacyDetail;
}

export default function PharmacyDetail(props: pharmacyDetailProps) {
  const { toast } = useToast();
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof pharmacyFormSchemaCreate>>({
    resolver: zodResolver(pharmacyFormSchemaCreate),
    mode: "onChange",
    defaultValues: {
      name: props.data.name,
      is_active: props.data.is_active ? 1 : 0,
      logo: props.data.logo,
      partner_id: props.data.partner.id,
    },
  });

  const url = window.location.pathname;
  const formAddress = useForm<z.infer<typeof addressSchema>>({
    resolver: zodResolver(addressSchema),
    mode: "onChange",
    defaultValues: {
      province: props.data.address.province,
      city: props.data.address.city,
      district: props.data.address.district,
      subdistrict: props.data.address.subdistrict,
      name: props.data.address.name,
      postal_code: props.data.address.postal_code,
      phone_number: props.data.address.phone_number,
      latitude: props.data.address.latitude,
      longitude: props.data.address.longitude,
    },
  });

  const [editMode, setEditMode] = useState(false);
  const [open, setOpen] = useState(false);
  const [imageState, setImageState] = useState(props.data.logo);
  const [partnerParam, setPartnerParam] = useState("");
  const [pharmacistParam, setPharmacistParam] = useState("");
  const [pharmacistSelected, setPharmacistSelected] = useState<number[]>(
    props.data.pharmacists.map((p) => p.id),
  );
  const [coordinates, setCoordinates] = useState<LatLng>(
    new LatLng(props.data.address.latitude, props.data.address.longitude),
  );
  const [logisticSelected, setLogisticSelected] = useState<number[]>(
    props.data.logistic_partners.map((l) => l.id),
  );
  const [partnerId, setPartnerId] = useState("");
  const [locationState, setLocationState] = useState({
    provinceId: "",
    provinceName: props.data.address.province,
    cityId: "",
    cityName: props.data.address.city,
    districtId: "",
    districtName: props.data.address.district,
    subDistrictId: "",
    subDistrictName: props.data.address.subdistrict,
  });

  const {
    error: errorEdit,
    isLoading: isLoadingEdit,
    fetchData: responsePost,
  } = useFetch<unknown, FormData>("/admin/pharmacies", {
    method: "POST",
  });
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
  const { data: pharmacistData, isLoading: isLoadingDelete } = useFetch<
    PaginatedResponse<adminPharmacistResponse>
  >("/admin/pharmacists?assigned=false&search_value=" + pharmacistParam);
  const { data: logisticData } =
    useFetch<logisticResponse[]>("/logistic-partners");
  const { error: errorDelete, fetchData: responseDelete } = useFetch<unknown>(
    url,
    { method: "DELETE" },
  );

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
  const defaultPharmacistOption = useMemo(() => {
    return props.data.pharmacists.map((p) => {
      const opt: Option = { label: p.name, value: String(p.id) };
      return opt;
    });
  }, [props.data.pharmacists]);
  const defaultLogisticOption = useMemo(() => {
    return props.data.logistic_partners.map((l) => {
      const opt: Option = { label: l.name, value: String(l.id) };
      return opt;
    });
  }, [props.data.logistic_partners]);

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

  const handleOnUploadedImage = (url: string) => {
    setImageState(url);
    form.setValue("logo", url);
    form.trigger("logo");
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

  const handleEditMode = () => {
    form.clearErrors();
    form.reset();
    formAddress.clearErrors();
    formAddress.reset();
    setEditMode((editMode) => !editMode);
  };

  const handleOnDelete = async () => {
    const resp = await responseDelete(props.data.id);
    if (resp?.status == 204) {
      toast({
        title: "Pharmacy Successfully Deleted!",
        description: "",
        className: "my-2",
      });
      navigate("/admin/pharmacies");
    }
    setOpen(false);
    return;
  };

  const handleOnSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const formData = new FormData(ev.currentTarget);
    const addressData = formAddress.getValues();
    addressData.postal_code = String(addressData.postal_code);
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
        title: "Successfully Updated Pharmacy",
        className: "my-2",
      });
      navigate("/admin/pharmacies");
    }
    return;
  };

  const handleSetOpen = () => {
    setOpen((prev) => !prev);
  };

  useEffect(() => {
    if (errorEdit != undefined || errorDelete != undefined) {
      toast({
        variant: "destructive",
        title: "Something went wrong",
        description: errorEdit
          ? errorEdit.error[0].message
          : errorDelete?.error[0].message,
        className: "my-2",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    }
  }, [errorDelete, errorEdit, toast]);

  return (
    <section className="m-auto mt-10 w-fit max-w-2xl rounded-2xl border p-4 shadow-xl">
      {(isLoadingDelete || isLoadingEdit) && <LoadingScreen />}
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
            editMode={editMode}
            defaultValue={props.data.name}
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
              {editMode && (
                <UploadImage
                  setUploadedImage={handleOnUploadedImage}
                  isUploaded={imageState != ""}
                />
              )}
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
              defaultValue={props.data.partner.name}
              editMode={editMode}
            />
          </PharmacyCreateField>
          <FieldForm label="Pharmacist">
            <MultipleSearchSelector
              options={pharmacistOptions ? pharmacistOptions : []}
              onSearch={onClickSearchPharmacist}
              searchPlaceholder={"Select Pharmacist"}
              onSelect={onSelectSearchPharmacist}
              value={defaultPharmacistOption}
              editMode={editMode}
            />
          </FieldForm>
          <FieldForm label="Logistic" mandatory={true}>
            <MultipleSearchSelector
              options={logisticOptions ? logisticOptions : []}
              onSearch={() => {}}
              searchPlaceholder={"Select Logistic"}
              onSelect={onSelectSearchLogistic}
              value={defaultLogisticOption}
              editMode={editMode}
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
              disabled={!editMode}
              checked={form.getValues("is_active") == 1}
              onCheckedChange={(e) => {
                form.setValue("is_active", e ? 1 : 0);
                form.trigger("is_active");
              }}
              defaultChecked={props.data.is_active}
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
            defaultValue={props.data.address.phone_number}
            editMode={editMode}
          >
            <PhoneInput
              className={editMode ? "" : "hidden"}
              value={formAddress.getValues("phone_number")}
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
              editMode={editMode}
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
              editMode={editMode}
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
              editMode={editMode}
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
              editMode={editMode}
            />
          </AddressField>
          <AddressField
            label="Address Detail"
            control={formAddress.control}
            name={"name"}
            mandatory={true}
            defaultValue={props.data.address.name}
            editMode={editMode}
          />
          <AddressField
            label="Postal Code"
            control={formAddress.control}
            name={"postal_code"}
            mandatory={true}
            type="number"
            defaultValue={props.data.address.postal_code}
            editMode={editMode}
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
            editMode={editMode}
            coordinates={coordinates}
            setCoordinates={handleUseMyLocation}
          />
        </form>
      </Form>

      <div className="mt-10 flex justify-between">
        {editMode ? (
          <CancelButton onClick={handleEditMode} />
        ) : (
          <BackButton onClick={() => navigate("/admin/pharmacies")} />
        )}

        {editMode ? (
          <SubmitButton form="form" />
        ) : (
          <div className="flex items-center gap-4">
            <DeleteButtonConfirmationModal
              message="Are you sure you want to delete this pharmacy?"
              handleDelete={handleOnDelete}
              open={open}
              setOpen={setOpen}
              handleSetOpen={handleSetOpen}
            />
            <EditButton onClick={handleEditMode} />
          </div>
        )}
      </div>
    </section>
  );
}
