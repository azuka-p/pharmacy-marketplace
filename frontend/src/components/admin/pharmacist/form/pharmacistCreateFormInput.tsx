import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import FieldForm from "../../form/fieldForm";
import { Control } from "react-hook-form";
import InputForm from "../../form/inputForm";

interface pharmacistCreateFormInputProps {
  control: Control<
    {
      name: string;
      sipa_number: string;
      phone_number: string;
      years_of_experience: number;
      email: string;
      password: string;
    },
    unknown
  >;
  name:
    | "name"
    | "sipa_number"
    | "phone_number"
    | "years_of_experience"
    | "email"
    | "password";
  children?: JSX.Element;
  hidden?: boolean;
  placeholder?: string;
  label?: string;
  hiddenField?: boolean;
  mandatory?: boolean;
  editMode?: boolean;
  defaultValue?: number | string;
}

export default function PharmacistCreateField(
  props: pharmacistCreateFormInputProps,
) {
  return (
    <FormField
      control={props.control}
      name={props.name}
      render={({ field }) => (
        <FormItem className={`${props.hiddenField && "hidden"}`}>
          <FieldForm
            label={props.label ? props.label : ""}
            mandatory={props.mandatory}
          >
            <FormControl className="flex-grow">
              <>
                <InputForm
                  defaultValue={props.defaultValue}
                  editMode={props.editMode}
                  type={"text"}
                  className={props.hidden ? "hidden" : ""}
                  placeholder={props.placeholder}
                  {...field}
                  required={props.mandatory}
                />
                {props.children}
              </>
            </FormControl>
          </FieldForm>
          <FormMessage className="text-right" />
        </FormItem>
      )}
    />
  );
}
