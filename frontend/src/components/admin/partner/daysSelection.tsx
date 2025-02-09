interface propsDays {
  data: { name: string; symbol: string; isActive: boolean }[];
  onClick: (key: number) => void;
  disabled?: boolean;
}

export default function DaysSelection(props: propsDays) {
  return (
    <div
      className={`grid grid-cols-7 justify-between border-[1px] ${!props.disabled && "border-black"}`}
    >
      {props.data.map((value, key) => (
        <div
          className={`border-r-[1px] p-1 text-center text-sm font-medium ${!props.disabled && "border-black hover:cursor-pointer"} ${key == 6 && "border-none"} ${value.isActive ? "bg-blue-300" : ""}`}
          onClick={() => props.onClick(key)}
          key={value.name}
        >
          {value.symbol}
        </div>
      ))}
    </div>
  );
}
