import { currencyFormat } from "@/utils/currencyFormatter";

type Data = {
  name: string;
  price: string;
  selling_unit: string;
};

export default function ProductDetail(props: Data) {
  return (
    <div>
      <h1 className="mb-2 text-2xl font-medium">{props.name}</h1>
      <p className="mb-1 text-3xl font-semibold text-primBlue">
        Rp{currencyFormat(Number(props.price))}
      </p>
      <p className="text-slate-600">per {props.selling_unit}</p>
    </div>
  );
}
