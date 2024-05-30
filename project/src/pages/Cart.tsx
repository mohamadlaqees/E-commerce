import { Heading } from "@components/common/Heading/Heading";
import CartItemList from "@components/eCommerce/CartItemList/CartItemList";
import { CartSubTotalPrice } from "@components/eCommerce/CartSubTotalPrice/CartSubTotalPrice";
import Loading from "@components/feedback/Loading/Loading";
import LottieHanlder from "@components/feedback/LottieHanlder/LottieHanlder";
import CartSkeleton from "@components/feedback/skeletons/CartSkeleton/CartSkeleton";
import useCart from "@hooks/useCart";
import removeCartItem from "@store/Cart/act/removeCartItem";
import { changeQuantity } from "@store/Cart/cartSlice";
import { useCallback } from "react";

const Cart = () => {
  const {
    dispatch,
    loading,
    products,
    error,
    productFullInfo,
    placeOrderStatus,
  } = useCart();
  const changeItemQuantity = useCallback((id: number, quantity: number) => {
    dispatch(changeQuantity({ id, quantity }));
  }, []);

  const removeItemHandler = useCallback(({ id }: { id: number }) => {
    dispatch(removeCartItem({ id: id, type: "remove" }));
  }, []);
  return (
    <>
      <Heading content="Cart" />
      <Loading status={loading} error={error} skeleton={<CartSkeleton />}>
        {productFullInfo.length > 0 ? (
          <>
            <CartItemList
              data={products}
              changeItemQuantity={changeItemQuantity}
              removeCartItem={removeItemHandler}
            />
            <CartSubTotalPrice products={products} />
          </>
        ) : placeOrderStatus === "succeeded" ? (
          <LottieHanlder
            type="success"
            message="Your order has been placed successfully"
          />
        ) : placeOrderStatus === "idle" && productFullInfo.length === 0 ? (
          <LottieHanlder type="emptyCart" message="empty" />
        ) : (
          ""
        )}
      </Loading>
    </>
  );
};

export default Cart;
