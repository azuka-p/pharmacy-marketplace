interface OrderDetailFieldProps {
  label: string;
  data: string | number | JSX.Element | undefined;
}

export default function OrderDetailField(props: OrderDetailFieldProps) {
  return (
    <div className="grid w-full grid-cols-3 gap-4">
      <div className="col-span-1 flex justify-between text-slate-600">
        {props.label}
        <span className="">:</span>
      </div>
      <div className="col-span-2 line-clamp-2 overflow-hidden text-ellipsis">
        {props.data}
      </div>
    </div>
  );
}
