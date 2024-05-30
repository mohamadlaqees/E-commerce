import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./hooks";
import { getProductsByItems } from "@store/Cart/act/getProductsByItems";
import { initateState } from "@store/Order/orderSlice";

const useCart = () => {
  const { items, productFullInfo, loading, error } = useAppSelector(
    (state) => state.cartSlice
  );
  const placeOrderStatus = useAppSelector((state) => state.orderSlice.loading);
  const dispatch = useAppDispatch();

  const itemId = Object.keys(items)
    .map((id) => `id=${id}`)
    .join("&");

  useEffect(() => {
    dispatch(getProductsByItems({ itemId, type: "cartFullInfo" }));
    return () => {
      if (itemId.length === 0) {
        dispatch(initateState());
      }
    };
  }, [dispatch, items]);

  const products = productFullInfo.map((item) => ({
    ...item,
    quantity: items[item.id],
  }));

  return {
    placeOrderStatus,
    loading,
    error,
    products,
    dispatch,
    productFullInfo,
  };
};

export default useCart;
