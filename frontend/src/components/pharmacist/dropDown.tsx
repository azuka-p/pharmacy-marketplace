interface propsDropDown {
  data: string[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function DropDown(props: propsDropDown) {
  return (
    <select
      className="h-full rounded-lg pl-2"
      onChange={(e) => props.onChange(e)}
    >
      {props.data.map((value, key) => (
        <option className="hover:before:bg-primBlue" value={value} key={key}>
          {value}
        </option>
      ))}
    </select>
  );
}
