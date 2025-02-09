import { useMemo, useState } from "react";

import { useNavigate } from "react-router-dom";
import { adminPartnerResponse } from "@/models/adminPartnerResponse";
import FormLabel from "../form/formLabel";
import SemiColonSeparator from "../form/semiColonSeparator";
import { Input } from "@/components/ui/input";
import ErrorMsg from "@/components/reusables/utils/errorMsg";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import DaysSelection from "./daysSelection";
import {
  BackButton,
  CancelButton,
  EditButton,
  SubmitButton,
} from "@/components/reusables/formButton";
import { dayList } from "@/utils/dayList";
import useFetch from "@/hooks/useFetch";
import { NO_CONTENT_RESPONSE_CODE } from "@/constants";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";
import DeleteButtonConfirmationModal from "@/components/reusables/DeleteButtonConfirmationModal";
import LoadingScreen from "@/components/reusables/loadingScreen";

interface propsDetail {
  data: adminPartnerResponse;
}

const year = new Date().getFullYear();
const formSchema = z.object({
  name: z
    .string({ required_error: "Field is required" })
    .nonempty({ message: "This field cannot be empty" })
    .min(3, { message: "Atleast 3 characters" }),
  year_founded: z
    .number({ invalid_type_error: "Invalid number" })
    .min(1800, { message: "Minimum years is 1800" })
    .max(year, { message: "Maximum year is current year" }),
  operational_hour_start: z.string(),
  operational_hour_end: z.string(),
  is_active: z.boolean(),
});

export default function PartnerDetail(props: propsDetail) {
  const { toast } = useToast();
  const url = window.location.pathname;
  const navigate = useNavigate();
  const daylistmapped = useMemo(() => {
    return dayList.map((val) => {
      if (props.data.active_days.includes(val.name)) {
        val.isActive = true;
        return val;
      }
      return val;
    });
  }, [props]);

  const [activeDays, setActiveDays] = useState(daylistmapped);
  const [editMode, setEditMode] = useState(false);
  const [open, setOpen] = useState(false);

  const days = activeDays
    .map((val) => {
      if (val.isActive) return val.name;
    })
    .filter((item) => item)
    .join(",");

  const {
    reset,
    register,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    mode: "onChange",
  });

  const handleActiveDayButton = (idx: number) => {
    const retActiveDays = activeDays.map((v, i) => {
      if (idx == i) {
        v.isActive = !v.isActive;
        return v;
      }
      return v;
    });
    setActiveDays(retActiveDays);
  };

  const handleEditMode = () => {
    reset();
    setActiveDays(daylistmapped);
    setEditMode((editMode) => !editMode);
  };

  const {
    error,
    fetchData: responsePatch,
    isLoading: isLoadingEdit,
  } = useFetch<unknown, adminPartnerResponse>("/admin/partners", {
    method: "PATCH",
  });

  const {
    error: errorDelete,
    fetchData: responseDelete,
    isLoading: isLoadingDelete,
  } = useFetch<unknown>(url, { method: "DELETE" });

  const handleOnSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const data = getValues() as adminPartnerResponse;
    data.active_days = days;
    data.id = props.data.id;
    data.operational_hour_end = data.operational_hour_end + ":00";
    data.operational_hour_start = data.operational_hour_start + ":00";

    const resp = await responsePatch(data);
    if (resp != undefined) {
      if (resp.status == 200) {
        toast({
          title: "Partner Successfully Updated!",
          description: "",
          className: "my-2 ",
        });
        navigate(0);
      }
    }
    return;
  };

  const handleDelete = async () => {
    const resp = await responseDelete(props.data.id);
    if (resp?.status == NO_CONTENT_RESPONSE_CODE) navigate("/admin/partners");
    setOpen(false);
    return;
  };

  const handleSetOpen = () => {
    setOpen((prev) => !prev);
  };

  return (
    <section className="m-auto mt-10 w-fit max-w-2xl rounded-2xl border p-4 shadow-xl">
      {(isLoadingDelete || isLoadingEdit) && <LoadingScreen />}
      <Toaster />
      <form
        onSubmit={(e) => handleOnSubmit(e)}
        id="form"
        action="submit"
        className="w-full space-y-2"
      >
        <div className="grid w-full grid-cols-[1fr_auto_1fr] items-center gap-2">
          <FormLabel children="Id" />
          <SemiColonSeparator />
          <Input
            className={`border-none shadow-none disabled:cursor-default ${editMode ? "disabled:opacity-50" : "disabled:opacity-100"}`}
            disabled={true}
            type="number"
            required={true}
            defaultValue={props.data.id}
          />
        </div>
        {/* NAME */}
        <div className="grid w-full grid-cols-[1fr_auto_1fr] items-center gap-2">
          <FormLabel children="Name" />
          <SemiColonSeparator />
          <Input
            className={`${!editMode ? "border-none" : "border-black"} shadow-none disabled:cursor-default ${editMode ? "disabled:opacity-50" : "disabled:opacity-100"}`}
            type="text"
            {...register("name")}
            required={true}
            defaultValue={props.data.name}
          />
          {errors.name?.message && (
            <ErrorMsg
              className="col-span-3 text-right"
              errorMsg={errors.name?.message as string}
            />
          )}
        </div>
        {/* YEAR FOUNDED */}
        <div className="grid w-full grid-cols-[1fr_auto_1fr] items-center gap-2">
          <FormLabel children="Year Founded" />
          <SemiColonSeparator />
          <Input
            className={`${!editMode ? "border-none" : "border-black"} shadow-none disabled:cursor-default ${editMode ? "disabled:opacity-50" : "disabled:opacity-100"}`}
            type="number"
            defaultValue={props.data.year_founded}
            {...register("year_founded", { valueAsNumber: true })}
            required={true}
          />
          {errors.year_founded?.message && (
            <ErrorMsg
              className="col-span-3 text-right"
              errorMsg={errors.year_founded?.message as string}
            />
          )}
        </div>
        {/* ACTIVE DAYS */}
        <div className="grid w-full grid-cols-[1fr_auto_1fr] items-center gap-2">
          <FormLabel children="Active Days" />
          <SemiColonSeparator />
          <div className="relative">
            <Input
              id="active_days"
              type="text"
              className="absolute left-0 -z-10 opacity-0"
              value={days}
              onChange={() => {}}
              required
            />
            <div>
              <DaysSelection
                disabled={!editMode}
                data={activeDays}
                onClick={editMode ? handleActiveDayButton : () => {}}
              />
            </div>
          </div>
          {errors.active_days?.message && (
            <ErrorMsg
              className="col-span-3 text-left"
              errorMsg={errors.active_days?.message as string}
            />
          )}
        </div>
        {/* OPERATIONAL HOUR START */}
        <div className="grid w-full grid-cols-[1fr_auto_1fr] items-center gap-2">
          <FormLabel children="Operational Hour Start" />
          <SemiColonSeparator />
          <div>
            <Input
              type="time"
              className={`block w-full rounded-lg border border-gray-300 text-sm leading-none text-gray-900 focus:border-blue-500 focus:ring-blue-500 ${!editMode ? "border-none" : "border-black"} shadow-none disabled:cursor-default ${editMode ? "bg-gray-50 p-2.5 disabled:opacity-50" : "disabled:opacity-100"} `}
              required
              defaultValue={props.data.operational_hour_start.slice(0, -3)}
              disabled={!editMode}
              {...register("operational_hour_start")}
            />
            {errors.operational_hour_start?.message && (
              <ErrorMsg
                className="text-left"
                errorMsg={errors.operational_hour_start?.message as string}
              />
            )}
          </div>
        </div>
        {/* OPERATIONAL HOUR END */}
        <div className="grid w-full grid-cols-[1fr_auto_1fr] items-center gap-2">
          <FormLabel children="Operational Hour End" />
          <SemiColonSeparator />
          <div>
            <Input
              type="time"
              className={`block w-full rounded-lg border border-gray-300 text-sm leading-none text-gray-900 focus:border-blue-500 focus:ring-blue-500 ${!editMode ? "border-none" : "border-black"} shadow-none disabled:cursor-default ${editMode ? "bg-gray-50 p-2.5 disabled:opacity-50" : "disabled:opacity-100"} `}
              required
              defaultValue={props.data.operational_hour_end.slice(0, -3)}
              disabled={!editMode}
              {...register("operational_hour_end")}
            />
            {errors.operational_hour_end?.message && (
              <ErrorMsg
                className="text-left"
                errorMsg={errors.operational_hour_end?.message as string}
              />
            )}
          </div>
        </div>
        {/* ACTIVE */}
        <div className="grid w-full grid-cols-[1fr_auto_1fr] items-center gap-2">
          <FormLabel children="Active" />
          <SemiColonSeparator />
          <div>
            <label
              className={`flex w-fit ${editMode && "cursor-pointer"} items-center`}
            >
              <Input
                type="checkbox"
                className="peer sr-only"
                defaultChecked={props.data.is_active}
                {...register("is_active")}
                disabled={!editMode}
              />
              <div className="peer relative h-6 w-11 rounded-full bg-gray-200 after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800 rtl:peer-checked:after:-translate-x-full"></div>
            </label>
          </div>
        </div>
        {error && <ErrorMsg errorMsg={error.error[0].message} />}
        {errorDelete && <ErrorMsg errorMsg={errorDelete.error[0].message} />}
      </form>

      <div className="mt-10 flex justify-between">
        {editMode ? (
          <CancelButton onClick={handleEditMode} />
        ) : (
          <BackButton onClick={() => navigate("/admin/partners")} />
        )}

        {editMode ? (
          <SubmitButton form="form" />
        ) : (
          <div className="flex items-center gap-4">
            <DeleteButtonConfirmationModal
              message="Are you sure you want to delete this partner"
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
