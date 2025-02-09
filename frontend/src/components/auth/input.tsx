interface inputProps {
  name: string;
  placeHolder: string;
  type: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isValid: boolean | undefined;
  warningMsg: string;
}

export default function Input(props: inputProps) {
  return (
    <div>
      <input
        className="relative h-12 w-[18.75rem] rounded-lg border-[1px] border-[#1A86C6] bg-[#D4EDFF] px-5 py-3 placeholder-[#1A86C6] outline-none placeholder:text-muted-foreground"
        name={props.name}
        type={props.type}
        placeholder={props.placeHolder}
        onChange={(e) => props.onChange(e)}
      ></input>
      {props.isValid == false && (
        <p className="text-[0.8rem] font-medium text-destructive text-red-600">
          {props.warningMsg}
        </p>
      )}
    </div>
  );
}
