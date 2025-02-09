import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import FieldForm from "../../form/fieldForm";
import { Control } from "react-hook-form";
import InputForm from "../../form/inputForm";

interface pharmacistDetailFormInputProps {
  control: Control<
    {
      phone_number: string;
      years_of_experience: number;
      id: number;
      name: string;
      sipa_number: string;
      email: string;
      pharmacy_id?: number | undefined;
    },
    unknown
  >;
  name:
    | "id"
    | "name"
    | "pharmacy_id"
    | "sipa_number"
    | "phone_number"
    | "years_of_experience"
    | "email";
  children?: JSX.Element;
  hidden?: boolean;
  placeholder?: string;
  label?: string;
  hiddenField?: boolean;
  mandatory?: boolean;
  editMode?: boolean;
  defaultValue?: number | string;
}

export default function PharmacistDetailField(
  props: pharmacistDetailFormInputProps,
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
