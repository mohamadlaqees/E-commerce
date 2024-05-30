import { TProduct } from "@util/types";
import { CartItem } from "../CartItem/CartItem";

const CartItemList = ({
  data,
  changeItemQuantity,
  removeCartItem,
}: {
  data: TProduct[];
  changeItemQuantity: (id: number, quantity: number) => void;
  removeCartItem: ({ id }: { id: number }) => void;
}) => {
  const products = data.map((item, inx) => (
    <CartItem
      key={inx}
      {...item}
      changeItemQuantity={changeItemQuantity}
      removeCartItem={removeCartItem}
    />
  ));
  return <>{products}</>;
};

export default CartItemList;
