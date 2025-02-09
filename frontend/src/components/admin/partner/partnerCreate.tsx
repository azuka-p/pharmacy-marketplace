import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CancelButton, SubmitButton } from "../../reusables/formButton";
import { useNavigate } from "react-router-dom";
import ErrorMsg from "../../reusables/utils/errorMsg";
import { Input } from "../../ui/input";
import FormLabel from "../form/formLabel";
import SemiColonSeparator from "../form/semiColonSeparator";
import DaysSelection from "./daysSelection";
import HourPicker from "./hourPicker";
import { useState } from "react";
import { adminPartnerPost } from "@/models/adminPartnerResponse";
import useFetch from "@/hooks/useFetch";
import { dayList } from "@/utils/dayList";

const year = new Date().getFullYear();

const formSchema = z.object({
  name: z
    .string({ required_error: "Field is required" })
    .min(3, { message: "Atleast 3 characters" }),
  year_founded: z
    .number({ invalid_type_error: "Invalid number" })
    .min(1800, { message: "Minimum years is 1800" })
    .max(year, { message: "Maximum year is current year" }),
  is_active: z.boolean(),
});

export default function CreatePartner() {
  const navigate = useNavigate();
  const [hourStart, setHourStart] = useState("");
  const [hourEnd, setHourEnd] = useState("");
  const [activeDays, setActiveDays] = useState(dayList);

  const days = activeDays
    .map((val) => {
      if (val.isActive) return val.name;
    })
    .filter((item) => item)
    .join(",");

  const {
    register,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    mode: "onChange",
  });

  const handleActiveButton = (idx: number) => {
    const retActiveDays = activeDays.map((v, i) => {
      if (idx == i) {
        v.isActive = !v.isActive;
        return v;
      }
      return v;
    });
    setActiveDays(retActiveDays);
  };

  const { error, fetchData: responsePost } = useFetch<
    unknown,
    adminPartnerPost
  >("/admin/partners", { method: "POST" });

  const handleOnSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const data = getValues() as adminPartnerPost;
    data.active_days = days;
    data.operational_hour_start = hourStart + ":00";
    data.operational_hour_end = hourEnd + ":00";
    const resp = await responsePost(data);
    if (resp != undefined) {
      if (resp.status == 201) {
        navigate("/admin/partners");
      }
    }
    return;
  };
  return (
    <section className="m-auto mt-10 w-fit max-w-2xl rounded-2xl border p-4 shadow-xl">
      <form
        id="form"
        action="submit"
        onSubmit={(e) => handleOnSubmit(e)}
        className="w-full space-y-2"
      >
        {/* NAME */}
        <div className="grid w-full grid-cols-[1fr_auto_1fr] items-center gap-2">
          <FormLabel children="Name" />
          <SemiColonSeparator />
          <Input type="text" {...register("name")} required={true} />
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
            type="number"
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
              required
              onChange={() => {}}
            />
            <div>
              <DaysSelection data={activeDays} onClick={handleActiveButton} />
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
            <HourPicker>
              <Input
                type="time"
                id="operational_hour_start"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm leading-none text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                value={hourStart}
                required
                onChange={(e) => setHourStart(e.currentTarget.value)}
              />
            </HourPicker>
            {errors.operational_hour_start?.message && (
              <ErrorMsg
                className="text-left"
                errorMsg={errors.name?.message as string}
              />
            )}
          </div>
        </div>
        {/* OPERATIONAL HOUR END */}
        <div className="grid w-full grid-cols-[1fr_auto_1fr] items-center gap-2">
          <FormLabel children="Operational Hour End" />
          <SemiColonSeparator />
          <div>
            <HourPicker>
              <Input
                type="time"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm leading-none text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                value={hourEnd}
                onChange={(e) => setHourEnd(e.currentTarget.value)}
                required
                id="operational_hour_end"
              />
            </HourPicker>
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
            <label className="flex w-fit cursor-pointer items-center">
              <Input
                type="checkbox"
                value=""
                className="peer sr-only"
                {...register("is_active")}
              />
              <div className="peer relative h-6 w-11 rounded-full bg-gray-200 after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800 rtl:peer-checked:after:-translate-x-full"></div>
            </label>
          </div>
        </div>
        {error && <ErrorMsg errorMsg={error.error[0].message} />}
      </form>

      <div className="mt-10 flex justify-between">
        <CancelButton onClick={() => navigate("/admin/partners")} />
        <SubmitButton form="form" />
      </div>
    </section>
  );
}
