import { currencyFormat } from "@/utils/currencyFormatter";

export default function TransactionProductDetail(props: {
    image: string;
    name: string;
    price: string;
    quantity: number;
  }) {
    return (
      <>
        <div className="flex gap-2 pt-2">
          <img src={props.image} className="h-12 w-12 rounded-md" />
          <div>
            <p className="font-semibold">{props.name}</p>
            <p className="text-sm">
              {props.quantity} x Rp{currencyFormat(Number(props.price))}
            </p>
          </div>
        </div>
      </>
    );
  }
  