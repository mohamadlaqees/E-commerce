import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "./hooks";
import { TProduct } from "@util/types";
import getOrders from "@store/Order/act/getOrders";
import { initateState } from "@store/Order/orderSlice";

const useOrders = () => {
  const { orderList, loading, error } = useAppSelector(
    (state) => state.orderSlice
  );
  const dispatch = useAppDispatch();
  const [selectedProduct, setSelectedProduct] = useState<TProduct[]>([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const promise = dispatch(getOrders());
    return () => {
      promise.abort();
      dispatch(initateState());
    };
  }, [dispatch]);
  return {
    orderList,
    error,
    loading,
    selectedProduct,
    setSelectedProduct,
    showModal,
    setShowModal,
  };
};
export default useOrders;
