import { currencyFormat } from "@/utils/currencyFormatter";
import { Skeleton } from "@/components/ui/skeleton";
import CounterButton from "./counterButton";
import { useNavigate } from "react-router-dom";
import { useDecodedJWTStore } from "@/store/useDecodedJWTStore";

interface Data {
  id: number;
  catalogId: number;
  image: string;
  name: string;
  unit: string;
  price: string;
  stock: number;
  isLoading: boolean;
}

export default function ProductCard(props: Data) {
  const navigate = useNavigate();
  const { data } = useDecodedJWTStore();

  return (
    <div className="w-full cursor-pointer grid-cols-1 gap-1 rounded-lg bg-white p-2 shadow-md">
      {props.isLoading ? (
        <>
          <Skeleton className="mb-2 h-[180px] w-full rounded-sm" />
          <Skeleton className="mb-1 h-6 w-full rounded-sm" />
          <Skeleton className="mb-1 h-4 w-[40%] rounded-sm" />
          <Skeleton className="mb-1 h-4 w-[60%] rounded-sm" />
        </>
      ) : (
        <>
          <div
            className="grid grid-cols-1 gap-1"
            onClick={() => {
              navigate(`/user/catalogs/${props.catalogId}`);
            }}
          >
            <img src={props.image} className="w-full object-cover" />
            <p className="h-10 text-sm">{props.name}</p>
            <p className="w-full bg-white font-bold text-primBlue">
              Rp{currencyFormat(Number(props.price))}
            </p>
          </div>
          <div className="mt-1 flex justify-center">
            {data?.is_verified ? (
              <CounterButton id={props.id} stockLimit={props.stock} />
            ) : (
              <></>
            )}
          </div>
        </>
      )}
    </div>
  );
}
