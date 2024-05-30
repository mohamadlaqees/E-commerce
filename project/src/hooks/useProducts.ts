import { TLoad } from "@util/types";
import { useLoaderData, useParams } from "react-router-dom";
import { useAppSelector } from "./hooks";
import { useEffect, useState } from "react";
import { getProducts } from "@pages/Products";

const useProducts = () => {
  const { data }: TLoad = useLoaderData() as TLoad;
  const params = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const prefix = params.prefix;
  const items = useAppSelector((state) => state.cartSlice.items);
  const wishListItemId = useAppSelector((state) => state.wishListSlice.itemsId);
  const userAccess = useAppSelector((state) => state.authSlice.accessToken);
  useEffect(() => {
    getProducts({ params }).then(() => setIsLoading(false));
  }, []);

  const itemFullInfo = data.map((item) => ({
    ...item,
    quantity: items[item.id] ?? 0,
    isLiked: wishListItemId.includes(item.id),
    isAuthenticated: userAccess ? true : false,
  }));
  return { prefix, itemFullInfo, isLoading };
};

export default useProducts;
