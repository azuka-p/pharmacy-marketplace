import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form } from "@/components/ui/form";

import { SearchSelector } from "@/components/reusables/searchSelector";
import address, {
  city,
  district,
  province,
  subDistrict,
} from "@/models/address";
import useFetch from "@/hooks/useFetch";
import useAddressOption from "@/hooks/useAddressOption";
import {
  onSelectSearchCity,
  onSelectSearchDistrict,
  onSelectSearchProvince,
  onSelectSearchSubDistrict,
} from "@/utils/addressSelect";
import { useEffect, useState } from "react";
import MapComponent from "@/components/reusables/map";
import { LatLng } from "leaflet";
import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { addressSchema } from "@/components/admin/pharmacy/form/address/addressFormSchema";
import AddressField from "@/components/admin/pharmacy/form/address/addressFormInput";
import { Option } from "@/components/ui/multiple-selector";
import { useToast } from "@/hooks/use-toast";
import { PhoneInput } from "@/components/reusables/phoneNumberInput";
import { UserAddress, UserAddressFormProps } from "@/models/user/address";
import { ToastAction } from "@radix-ui/react-toast";
import { useProfileStore } from "@/store/useProfileStore";

export default function AddressFormUser(props: UserAddressFormProps) {
  const { toast } = useToast();
  const { addAddress, editAddress, data, setActiveAddressId } =
    useProfileStore();
  const form = useForm<z.infer<typeof addressSchema>>({
    resolver: zodResolver(addressSchema),
    mode: "onChange",
    defaultValues: {
      name: props.address ? props.address?.name : "",
      province: props.address ? props.address?.province : "",
      city: props.address ? props.address?.city : "",
      district: props.address ? props.address?.district : "",
      subdistrict: props.address ? props.address?.subdistrict : "",
      phone_number: props.address ? props.address?.phone_number : "",
      postal_code: props.address
        ? String(props.address?.postal_code)
        : undefined,
      latitude: props.address ? props.address?.latitude : undefined,
      longitude: props.address ? props.address?.longitude : undefined,
    },
  });

  const [locationState, setLocationState] = useState({
    provinceId: "",
    provinceName: props.address ? props.address.province : "",
    cityId: "",
    cityName: props.address ? props.address.city : "",
    districtId: "",
    districtName: props.address ? props.address.district : "",
    subDistrictId: "",
    subDistrictName: props.address ? props.address.district : "",
  });

  const { data: provinceData } = useFetch<province[]>("/provinces");
  const { data: cityData } = useFetch<city[]>(
    "/cities/" + locationState.provinceId,
  );
  const { data: districtData } = useFetch<district[]>(
    "/districts/" + locationState.cityId,
  );
  const { data: subDistrictData } = useFetch<subDistrict[]>(
    "/subdistricts/" + locationState.districtId,
  );
  const { fetchData: coorReq } = useFetch<unknown, FormData>("/user/address", {
    method: "POST",
  });
  const { error: errRequest, fetchData: formRequest } = useFetch<
    unknown,
    address
  >("/user/addresses", {
    method: "POST",
  });
  const { error: errPatch, fetchData: formPatchRequest } = useFetch<
    unknown,
    UserAddress
  >("/user/addresses", {
    method: "PATCH",
  });
  const { error: errGetCoor, fetchData: addrReq } = useFetch<unknown, FormData>(
    "/user/coordinate",
    {
      method: "POST",
    },
  );
  const { fetchData: activateReq } = useFetch<{ id: number }>(
    "/user/addresses/activate",
    { method: "PATCH" },
  );

  const provinceOption: Option[] | undefined = useAddressOption(provinceData);
  const cityOption: Option[] | undefined = useAddressOption(cityData);
  const districtOption: Option[] | undefined = useAddressOption(districtData);
  const subDistrictOption: Option[] | undefined =
    useAddressOption(subDistrictData);

  const [coordinates, setCoordinates] = useState<LatLng>(
    new LatLng(
      props.address ? props.address.latitude : -6.1762581,
      props.address ? props.address.longitude : 106.8229916,
    ),
  );

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
      form.setValue("province", resp.data.data.province);
      form.setValue("city", resp.data.data.city);
      form.setValue("district", resp.data.data.district);
      form.setValue("subdistrict", resp.data.data.subdistrict);
      form.setValue("latitude", c.lat);
      form.setValue("longitude", c.lng);
      form.trigger([
        "province",
        "city",
        "district",
        "subdistrict",
        "latitude",
        "longitude",
      ]);
    }
    toast({
      title: "Auto fullfilled address using current location",
      className: "my-2",
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
      form.setValue("latitude", coorResult.lat);
      form.setValue("longitude", coorResult.lng);
      form.trigger(["latitude", "longitude"]);
    }
  };

  const handleOnsubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formValue = form.getValues();
    const resp = await formRequest(formValue);
    if (resp?.data != undefined) {
      if (data?.address.length == 0) {
        const respActivate = await activateReq({ id: resp.data.data.id });
        if (respActivate?.data != undefined) {
          setActiveAddressId(resp.data.id);
        }
      }
      toast({
        title: "Successfully created new address!",
        className: "my-2",
      });
      if (resp.data.data != undefined) {
        addAddress(resp.data.data as UserAddress);
      }
    }
    props.handleDialog(false);
  };

  const handleOnPatchSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formValue = form.getValues() as unknown as UserAddress;
    formValue.id = props.address ? props.address.id : -1;
    const resp = await formPatchRequest(formValue);
    if (resp?.data != undefined) {
      toast({
        title: "Successfully updated new address!",
        className: "my-2",
      });
      if (resp.data.data != undefined) {
        editAddress(resp.data.data as UserAddress);
      }
    }
    props.handleDialog(false);
  };

  useEffect(() => {
    if (errRequest != undefined) {
      toast({
        variant: "destructive",
        title: "Something went wrong",
        description: errRequest.error[0].message,
        className: "my-2",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
      return;
    }
    if (errPatch != undefined) {
      toast({
        variant: "destructive",
        title: "Something went wrong",
        description: errPatch.error[0].message,
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
  }, [errGetCoor, errPatch, errRequest, toast]);

  return (
    <>
      <Form {...form}>
        <form
          id="address_form"
          onSubmit={(e) =>
            props.editMode == true ? handleOnPatchSubmit(e) : handleOnsubmit(e)
          }
          className="z-50 flex flex-col gap-y-3"
        >
          <AddressField
            control={form.control}
            mandatory={true}
            name={"province"}
            label="Province"
            hidden={true}
          >
            <SearchSelector
              onSelect={(val, label) => {
                onSelectSearchProvince(val, label, setLocationState);
                form.setValue("province", label);
                form.trigger("province");
              }}
              defaultValue={locationState.provinceName}
              data={provinceOption ? provinceOption : []}
              placeholder={"Province"}
              value={locationState.provinceId}
              onSearch={() => {}}
            />
          </AddressField>

          <AddressField
            control={form.control}
            mandatory={true}
            name={"city"}
            label="City"
            hidden={true}
          >
            <SearchSelector
              onSelect={(val, label) => {
                onSelectSearchCity(val, label, setLocationState);
                form.setValue("city", label);
                form.trigger("city");
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
            control={form.control}
            mandatory={true}
            name={"district"}
            label="District"
            hidden={true}
          >
            <SearchSelector
              onSelect={(val, label) => {
                onSelectSearchDistrict(val, label, setLocationState);
                form.setValue("district", label);
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
            control={form.control}
            mandatory={true}
            name={"subdistrict"}
            label="Sub-District"
            hidden={true}
          >
            <SearchSelector
              onSelect={(val, label) => {
                onSelectSearchSubDistrict(val, label, setLocationState);
                form.setValue("subdistrict", label);
                form.trigger("subdistrict");
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
            control={form.control}
            mandatory={true}
            name={"name"}
            label="Address Name"
            hidden={false}
          ></AddressField>

          <AddressField
            control={form.control}
            mandatory={true}
            name={"postal_code"}
            label="Postal Code"
            hidden={false}
          ></AddressField>

          <AddressField
            control={form.control}
            mandatory={true}
            name={"phone_number"}
            label="Phone Numbers"
            hidden={true}
          >
            <PhoneInput
              value={form.getValues("phone_number")}
              defaultCountry="ID"
              onChange={(e) => {
                form.setValue("phone_number", e.toString());
                form.trigger("phone_number");
              }}
            />
          </AddressField>

          <AddressField
            control={form.control}
            mandatory={true}
            name={"latitude"}
            label="Latitude"
            hiddenField={true}
          />

          <AddressField
            control={form.control}
            mandatory={true}
            name={"longitude"}
            label="Longitude"
            hiddenField={true}
          />
          <MapComponent
            editMode={true}
            coordinates={coordinates}
            setCoordinates={handleUseMyLocation}
          />
        </form>
      </Form>
      <Button
        disabled={!form.formState.isValid}
        form="address_form"
        type="submit"
      >
        Save changes
      </Button>
      <DialogFooter></DialogFooter>
    </>
  );
}
