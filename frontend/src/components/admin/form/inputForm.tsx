import { Input } from "@/components/ui/input";

interface inputFormProps extends React.ComponentPropsWithRef<typeof Input> {
  className?: string;
  editMode?: boolean;
}

export default function InputForm(props: inputFormProps) {
  return (
    <>
      {props.editMode == false ? (
        <p className="px-4 py-2 font-medium">{props.defaultValue}</p>
      ) : (
        <Input
          {...props}
          className={`${props.disabled ? "border-none" : ""} shadow-none disabled:cursor-default ${!props.disabled ? "disabled:opacity-50" : "disabled:opacity-100"} ${props.className}`}
        ></Input>
      )}
    </>
  );
}
