import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./hooks";
import { getProductsByItems } from "@store/Cart/act/getProductsByItems";
import { clearWishListItems } from "@store/WishList/wishListSlice";

const useWishList = () => {
  const { itemsId, wishListItems, loading, error } = useAppSelector(
    (state) => state.wishListSlice
  );
  const { items } = useAppSelector((state) => state.cartSlice);
  const dispatch = useAppDispatch();

  const itemId = itemsId.map((id) => `id=${id}`).join("&");
  const itemFullInfo = wishListItems.map((item) => ({
    ...item,
    quantity: items[item.id],
    isLiked: itemsId.includes(item.id),
    isAuthenticated: true,
  }));

  useEffect(() => {
    dispatch(getProductsByItems({ itemId, type: "wishListFullInfo" }));
    return () => {
      dispatch(clearWishListItems());
    };
  }, [dispatch, itemsId, itemId]);

  return { wishListItems, loading, error, itemFullInfo };
};

export default useWishList;
