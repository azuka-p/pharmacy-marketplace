import { ProductCartType } from "@/store/useProductCartStore";

export default function totalProductPrice(cart: Map<number, ProductCartType>) {
  let sum = 0;
  cart.forEach((cartItem) => {
    if (cartItem.price) {
      sum += cartItem.price;
    }
  });
  return sum;
}
