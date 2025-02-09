import FieldForm from "@/components/admin/form/fieldForm";
import InputForm from "@/components/admin/form/inputForm";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Control } from "react-hook-form";

interface pharmacyCreateFormInputProps {
  control: Control<
    {
      name: string;
      phone_number: string;
      province: string;
      city: string;
      district: string;
      subdistrict: string;
      postal_code: string;
      latitude: number;
      longitude: number;
    },
    unknown
  >;
  name:
    | "name"
    | "phone_number"
    | "province"
    | "city"
    | "district"
    | "subdistrict"
    | "postal_code"
    | "latitude"
    | "longitude";
  children?: JSX.Element;
  hidden?: boolean;
  placeholder?: string;
  label?: string;
  hiddenField?: boolean;
  mandatory?: boolean;
  editMode?: boolean;
  defaultValue?: number | string;
  type?: string;
}

export default function AddressField(props: pharmacyCreateFormInputProps) {
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
                  type={props.type ?? "text"}
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
