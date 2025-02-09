import CounterButton from "../../../components/reusables/counterButton";

interface SubtotalProps {
  productId: number;
  stock: number
}

export default function Subtotal(props: SubtotalProps) {
  return (
    <div className="w-full">
      <CounterButton id={props.productId} stockLimit={props.stock} />
      <div className="mt-2 flex w-[40%] items-center justify-between">
        <p className="text-base"></p>
        <p className="text-xl font-bold">{}</p>
      </div>
    </div>
  );
}
