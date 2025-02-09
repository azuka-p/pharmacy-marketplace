import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import FieldForm from "../../form/fieldForm";
import { Control } from "react-hook-form";
import InputForm from "../../form/inputForm";

interface pharmacyCreateFormInputProps {
  control: Control<
    {
      name: string;
      logo: string;
      partner_id: number;
      is_active: number;
    },
    unknown
  >;
  name: "name" | "logo" | "partner_id" | "is_active";

  children?: JSX.Element;
  hidden?: boolean;
  placeholder?: string;
  label?: string;
  hiddenField?: boolean;
  mandatory?: boolean;
  editMode?: boolean;
  defaultValue?: number | string;
}

export default function PharmacyCreateField(
  props: pharmacyCreateFormInputProps,
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
