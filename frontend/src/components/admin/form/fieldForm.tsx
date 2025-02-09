import FormLabel from "./formLabel";
import SemiColonSeparator from "./semiColonSeparator";

interface fieldFormProps {
  children: JSX.Element;
  label: string;
  labelFor?: string;
  mandatory?: boolean;
}

export default function FieldForm(props: fieldFormProps) {
  return (
    <div className="grid w-full grid-cols-[1fr_auto_1fr] items-center gap-2">
      <div>
        <FormLabel htmlFor={props.labelFor}>{props.label}</FormLabel>
        {props.mandatory == true && <span className="text-red-600">*</span>}
      </div>
      <SemiColonSeparator />
      {props.children}
    </div>
  );
}
