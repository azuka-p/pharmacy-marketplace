import { useProductCartStore } from "@/store/useProductCartStore";
import { ShoppingCart } from "lucide-react";
import { memo, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CartIcon = () => {
  const navigate = useNavigate();
  const { totalCount, syncTotalCount } = useProductCartStore();
  useEffect(() => {
    syncTotalCount();
  }, [syncTotalCount]);

  return (
    <>
      <div className="relative flex gap-0">
        <ShoppingCart
          className="h-6 w-10 cursor-pointer"
          onClick={() => {
            navigate("/user/cart");
          }}
        />
        <div className="absolute bottom-4 right-0 rounded-full bg-red-500 px-[6px] py-[2px]">
          <p className="text-[10px] text-white">{totalCount}</p>
        </div>
      </div>
    </>
  );
};

export default memo(CartIcon);
