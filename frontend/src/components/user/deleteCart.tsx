import { useProductCartStore } from "@/store/useProductCartStore";
import { Trash2 } from "lucide-react";
import { useShallow } from "zustand/shallow";

interface deleteCartProps {
  productId: number;
  onClick: () => void;
}

export default function DeleteCart(props: deleteCartProps) {
  const { deleteCart } = useProductCartStore(
    useShallow((state) => state),
  );
  return (
    <Trash2
      className="hover:cursor-pointer"
      onClick={() => {
        deleteCart(props.productId);
        props.onClick();
      }}
    ></Trash2>
  );
}
