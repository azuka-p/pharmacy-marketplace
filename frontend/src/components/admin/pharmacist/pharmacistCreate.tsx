import { z } from "zod";
import { Form } from "../../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  adminPharmacistPost,
  adminPharmacistResponse,
} from "@/models/adminPharmacistResponse";
import { useEffect, useState } from "react";
import useFetch from "@/hooks/useFetch";
import { CancelButton, SubmitButton } from "../../reusables/formButton";
import { useNavigate } from "react-router-dom";
import { Button } from "../../ui/button";
import eyeOffIcon from "../../../assets/icons/eye-off.svg";
import eyeOpenIcon from "../../../assets/icons/eye.svg";
import generatePassword from "@/utils/generatePassword";
import PharmacistCreateField from "./form/pharmacistCreateFormInput";
import { pharmacistFormCreateSchema } from "./form/formSchemaCreate";
import { PhoneInput } from "@/components/reusables/phoneNumberInput";
import { Input } from "@/components/ui/input";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";

export default function CreatePharmacist() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [randomPassword, setPassword] = useState("");
  const [passVisible, setPassVisible] = useState(false);

  const generateRandomPassword = () => {
    const randPass = generatePassword();
    setPassword(randPass);
    form.setValue("password", randPass);
    form.trigger("password");
  };
  const handlePassVisibility = () => {
    setPassVisible((passVisible) => !passVisible);
  };

  const form = useForm<z.infer<typeof pharmacistFormCreateSchema>>({
    resolver: zodResolver(pharmacistFormCreateSchema),
    mode: "onChange",
  });

  const {
    error,
    isLoading,
    fetchData: responsePost,
  } = useFetch<adminPharmacistResponse, adminPharmacistPost>(
    "/admin/pharmacists",
    { method: "POST" },
  );

  const handleOnSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();

    const formData = form.getValues() as adminPharmacistPost;
    formData.years_of_experience = Number(formData.years_of_experience);
    const resp = await responsePost(formData);
    if (resp?.data) {
      toast({
        title: "Pharmacist Successfully Created!",
        description: "",
        className: "my-2 ",
      });
      navigate("/admin/pharmacists");
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
    }
  }, [error, toast]);

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
          <PharmacistCreateField
            label="Name"
            control={form.control}
            name={"name"}
          />
          <PharmacistCreateField
            label="Email"
            control={form.control}
            name={"email"}
          />
          <PharmacistCreateField
            label="Sipa Number"
            control={form.control}
            name={"sipa_number"}
          />
          <PharmacistCreateField
            label="Phone Number"
            control={form.control}
            name={"phone_number"}
            hidden={true}
          >
            <PhoneInput
              defaultCountry="ID"
              onChange={(e) => {
                form.setValue("phone_number", e.toString());
                form.trigger("phone_number");
              }}
            />
          </PharmacistCreateField>
          <PharmacistCreateField
            label="Years of Experience"
            control={form.control}
            name={"years_of_experience"}
          />
          <PharmacistCreateField
            label="Password"
            control={form.control}
            name={"password"}
            hidden={true}
          >
            <div className="relative flex items-center justify-center">
              <Input
                type={passVisible ? "text" : "password"}
                placeholder={"Click Generate Password Button"}
                disabled={true}
                value={randomPassword}
              />
              <span
                className="absolute right-3 hover:cursor-pointer"
                onClick={handlePassVisibility}
              >
                {passVisible ? (
                  <img src={eyeOpenIcon} alt="password visible icon" />
                ) : (
                  <img src={eyeOffIcon} alt="password invisible icon" />
                )}
              </span>
            </div>
          </PharmacistCreateField>
        </form>
      </Form>

      <div className="mt-10 flex justify-between">
        <CancelButton onClick={() => navigate("/admin/pharmacists")} />
        <Button className="bg-yellow-500" onClick={generateRandomPassword}>
          Generate Password
        </Button>
        <SubmitButton
          form="form"
          disabled={!form.formState.isValid || !randomPassword}
        />
      </div>
    </section>
  );
}
