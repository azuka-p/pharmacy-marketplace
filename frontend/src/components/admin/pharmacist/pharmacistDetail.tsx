import { z } from "zod";
import { Form } from "../../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  adminPharmacistPatch,
  adminPharmacistResponse,
} from "@/models/adminPharmacistResponse";
import { useEffect, useState } from "react";
import useFetch from "@/hooks/useFetch";
import {
  BackButton,
  CancelButton,
  EditButton,
  SubmitButton,
} from "../../reusables/formButton";
import { useNavigate } from "react-router-dom";
import { SearchSelector } from "../../reusables/searchSelector";
import { adminPharmacyResponse } from "@/models/adminPharmacyResponse";
import { PaginatedResponse } from "@/models/jsonResponse";
import { Option } from "../../ui/multiple-selector";
import { NO_CONTENT_RESPONSE_CODE } from "@/constants";
import PharmacistDetailField from "./form/pharmacistDetailFormInput";
import { pharmacistFormDetailSchema } from "./form/formSchemaDetail";
import usePharmacyOption from "@/hooks/usePharmacyOption";
import { PhoneInput } from "@/components/reusables/phoneNumberInput";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import DeleteButtonConfirmationModal from "@/components/reusables/DeleteButtonConfirmationModal";
import LoadingScreen from "@/components/reusables/loadingScreen";

interface propsDetail {
  data: adminPharmacistResponse;
}

export default function PharmacistDetail(props: propsDetail) {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);
  const [open, setOpen] = useState(false);

  const url = window.location.pathname;
  const [pharmacyParam, setPharmacyParam] = useState("");
  const [pharmacyId, setPharmacyId] = useState("");

  const { data: pharmacyData } = useFetch<
    PaginatedResponse<adminPharmacyResponse>
  >("/admin/pharmacies?search_value=" + pharmacyParam);
  const pharmacyOptions: Option[] | undefined = usePharmacyOption(
    pharmacyData?.data.entries,
  );

  const onClickSearchPharmacy = (value: string) => {
    setPharmacyParam(value);
  };
  const onSelectSearchPharmacy = (value: string) => {
    setPharmacyId(value);
    form.setValue("pharmacy_id", Number(value));
    form.trigger();
  };
  const form = useForm<z.infer<typeof pharmacistFormDetailSchema>>({
    resolver: zodResolver(pharmacistFormDetailSchema),
    mode: "onChange",
    defaultValues: {
      id: props.data.id,
      email: props.data.email,
      name: props.data.name,
      pharmacy_id: props.data.pharmacy_id,
      phone_number: props.data.phone_number,
      sipa_number: props.data.sipa_number,
      years_of_experience: props.data.years_of_experience,
    },
  });

  const handleEditMode = () => {
    form.clearErrors();
    form.reset();
    setEditMode((editMode) => !editMode);
  };

  const {
    error: errorEdit,
    fetchData: responseEdit,
    isLoading: isLoadingEdit,
  } = useFetch<adminPharmacistResponse, adminPharmacistPatch>(
    "/admin/pharmacists",
    { method: "PATCH" },
  );

  const {
    error: errorDelete,
    isLoading: isLoadingDelete,
    fetchData: responseDelete,
  } = useFetch<unknown>(url, { method: "DELETE" });

  const handleOnSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const formData = form.getValues() as adminPharmacistPatch;
    formData.years_of_experience = Number(formData.years_of_experience);
    const data = await responseEdit(formData);
    if (data?.data != undefined) {
      toast({
        title: "Pharmacist Updated!",
        description: "",
        className: "my-2",
      });
      setEditMode(false);
      navigate(0);
    }
    return;
  };

  const handleDelete = async () => {
    const resp = await responseDelete(props.data.id);
    if (resp?.status == NO_CONTENT_RESPONSE_CODE) {
      toast({
        title: "Pharmacist Successfully Deleted!",
        description: "",
        className: "my-2",
      });
      navigate("/admin/pharmacists");
    }
    setOpen(false);
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
      <Toaster />
      <Form {...form}>
        <form
          id="form"
          action="submit"
          onSubmit={(e) => handleOnSubmit(e)}
          className="w-full space-y-2"
        >
          <PharmacistDetailField
            control={form.control}
            name={"id"}
            hiddenField={true}
          />
          <PharmacistDetailField
            label="Name"
            defaultValue={props.data.name}
            control={form.control}
            editMode={false}
            name={"name"}
          />
          <PharmacistDetailField
            label="Email"
            defaultValue={props.data.email}
            control={form.control}
            editMode={false}
            name={"email"}
          />
          <PharmacistDetailField
            control={form.control}
            name="pharmacy_id"
            hidden={true}
            label="Pharmacy"
          >
            <SearchSelector
              editMode={editMode}
              defaultValue={
                props.data.pharmacy_name ? props.data.pharmacy_name : ""
              }
              onSelect={onSelectSearchPharmacy}
              data={pharmacyOptions ? pharmacyOptions : []}
              placeholder={"Pharmacy"}
              value={pharmacyId}
              onSearch={onClickSearchPharmacy}
            />
          </PharmacistDetailField>
          <PharmacistDetailField
            label="Sipa Number"
            defaultValue={props.data.sipa_number}
            control={form.control}
            editMode={false}
            name={"sipa_number"}
          />
          <PharmacistDetailField
            label="Phone Number"
            defaultValue={props.data.phone_number}
            control={form.control}
            editMode={editMode}
            hidden={true}
            name={"phone_number"}
            mandatory={true}
          >
            <PhoneInput
              onChange={(e) => {
                form.setValue("phone_number", e.toString());
                form.trigger();
              }}
              value={form.getValues("phone_number")}
              className={editMode ? "" : "hidden"}
            />
          </PharmacistDetailField>
          <PharmacistDetailField
            label="Years of Experience"
            mandatory={true}
            defaultValue={props.data.years_of_experience}
            control={form.control}
            editMode={editMode}
            name={"years_of_experience"}
          />
        </form>
      </Form>

      <div className="mt-10 flex justify-between">
        {editMode ? (
          <CancelButton onClick={handleEditMode} />
        ) : (
          <BackButton onClick={() => navigate("/admin/pharmacists")} />
        )}

        {editMode ? (
          <SubmitButton form="form" disabled={!form.formState.isValid} />
        ) : (
          <div className="flex items-center gap-4">
            <DeleteButtonConfirmationModal
              message="Are you sure you want to delete this pharmacist"
              handleDelete={handleDelete}
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
