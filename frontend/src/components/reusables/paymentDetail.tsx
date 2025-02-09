import { currencyFormat } from "@/utils/currencyFormatter";

export default function PaymentDetail(props: {
  total_price_shipping: string;
  total_price_product: string;
}) {
  return (
    <>
      <div>
        <h2 className="font-bold">Payment Detail</h2>
        <div className="grid grid-cols-2">
          <p className="text-slate-600">Payment Method</p>
          <p className="text-right">Manual Transfer</p>
          <p className="text-slate-600">Total Product Price</p>
          <p className="text-right">
            Rp{currencyFormat(Number(props.total_price_shipping))}
          </p>
          <p className="text-slate-600">Total Shipping Fee</p>
          <p className="text-right">
            Rp{currencyFormat(Number(props.total_price_product))}
          </p>
        </div>
        <div className="mt-2 flex justify-between text-xl font-bold text-primBlue">
          <p>Total Shopping</p>
          <p>
            Rp
            {currencyFormat(
              Number(props.total_price_shipping) +
                Number(props.total_price_product),
            )}
          </p>
        </div>
      </div>
    </>
  );
}
