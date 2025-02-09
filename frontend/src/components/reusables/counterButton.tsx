import { memo, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import useFetch from "@/hooks/useFetch";
import { CartRequest } from "@/models/user/cart";
import { useProductCartStore } from "@/store/useProductCartStore";
import { useToast } from "@/hooks/use-toast";
import { useShallow } from "zustand/shallow";
import IncreamentButton from "./increamentButton";
import DecreamentButton from "./decreamentButton";

const STOCK_LOW_LIMIT: number = 0;
const INCREMENT_REQ_URL = "/user/carts/increment";
const DECREMENT_REQ_URL = "/user/carts/decrement";

type Data = {
  buttonClassName?: string;
  id: number;
  stockLimit: number;
};

const CounterButton = (props: Data) => {
  let showButtonState = true;
  const { cartMap, addToCart, increase, decrease } = useProductCartStore(
    useShallow((state) => state),
  );
  const { totalCount, syncTotalCount } = useProductCartStore(
    useShallow((state) => state),
  );

  if (cartMap.has(props.id)) {
    showButtonState = false;
  }

  const [showAddToCartButton, setShowAddToCartButton] =
    useState(showButtonState);

  const [isEditting, setIsEditting] = useState(false);

  const initCounter = cartMap.get(props.id)?.count;
  const [value, setValue] = useState<number>(
    initCounter != undefined ? initCounter : 0,
  );

  const { toast } = useToast();
  const {
    error: errorInc,
    fetchData: requestPostInc,
    isLoading: isLoadingInc,
  } = useFetch<CartRequest>(INCREMENT_REQ_URL, {
    method: "POST",
  });
  const {
    error: errorDec,
    fetchData: requestPostDec,
    isLoading: isLoadingDec,
  } = useFetch<CartRequest>(DECREMENT_REQ_URL, {
    method: "POST",
  });

  const handleAddCart = async () => {
    const req: CartRequest = { product_id: props.id };
    const resp = await requestPostInc(req);

    if (resp != undefined) {
      setValue((prev) => prev + 1);
      addToCart(req.product_id);
      syncTotalCount();
      setShowAddToCartButton(false);
    } else {
      toast({
        description: "cannot add product to cart",
      });
    }
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (
      Number(e.target.value) >= STOCK_LOW_LIMIT &&
      Number(e.target.value) <= props.stockLimit
    ) {
      setValue(Number(e.target.value));
    }
    setIsEditting(true);
  };

  const handleOnBlur = () => {
    setIsEditting(false);
  };

  const handleOnClickMinus = async () => {
    const req: CartRequest = { product_id: props.id };
    const resp = await requestPostDec(req);
    if (resp != undefined) {
      setValue((prev) => prev - 1);
      decrease(props.id);
      syncTotalCount();
    }
    if (value - 1 === STOCK_LOW_LIMIT) {
      setShowAddToCartButton(true);
    } else {
      setShowAddToCartButton(false);
    }
  };

  const handleOnClickPlus = async () => {
    const req: CartRequest = { product_id: props.id };
    const resp = await requestPostInc(req);
    if (resp != undefined) {
      setValue((prev) => prev + 1);
      increase(props.id);
      syncTotalCount();
    }
  };

  const isFulfilLowLimit = (): boolean => {
    return !(value - 1 >= STOCK_LOW_LIMIT);
  };

  const isFulfilHighLimit = (): boolean => {
    return !(value + 1 <= props.stockLimit);
  };

  const isDescDisabled = () => {
    return isFulfilLowLimit() || isLoadingDec;
  };

  const isIncDisabled = () => {
    return isFulfilHighLimit() || isLoadingInc;
  };

  useEffect(() => {
    if (value === STOCK_LOW_LIMIT) {
      setShowAddToCartButton(true);
    } else {
      setShowAddToCartButton(false);
    }
    if (errorInc) {
      toast({
        description: `${errorInc.error[0].message}`,
      });
    }
    if (errorDec) {
      toast({
        description: `${errorDec.error[0].message}`,
      });
    }
  }, [value, errorInc, errorDec, totalCount]);
  return (
    <>
      {showAddToCartButton && !isEditting ? (
        <Button
          variant="outline"
          className={`w-full border-primBlue text-primBlue ${props.buttonClassName}`}
          onClick={handleAddCart}
          disabled={isLoadingInc}
        >
          Add to cart
        </Button>
      ) : (
        <div className="border-blackshadow-sm flex h-9 w-min flex-row rounded-full border-[1px]">
          <DecreamentButton
            handleOnClickMinus={handleOnClickMinus}
            isDescDisabled={isDescDisabled()}
          />
          <Input
            className="w-10 border-none text-center"
            id="count"
            type={"number"}
            placeholder="0"
            onChange={handleOnChange}
            onBlur={handleOnBlur}
            value={Number(value).toString()}
            readOnly
          ></Input>
          <IncreamentButton
            isIncDisabled={isIncDisabled()}
            handleOnClickPlus={handleOnClickPlus}
          />
        </div>
      )}
    </>
  );
};

export default memo(CounterButton);
