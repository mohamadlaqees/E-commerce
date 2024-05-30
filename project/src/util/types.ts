import notFound from "@assets/lottieFile/notFound.json";
import error from "@assets/lottieFile/error.json";
import emptyCart from "@assets/lottieFile/emptyCart.json";
import success from "@assets/lottieFile/success.json";
import cartLoading from "@assets/lottieFile/cartLoading.json";
import { z } from "zod";
import { signUpSchema } from "src/Validation/SignUpSchema";
import { Path, FieldValues, UseFormRegister } from "react-hook-form";

export type TCategory = {
  id: number;
  title: string;
  prefix: string;
  img: string;
  isLoading: boolean;
};

export type TProduct = {
  id: number;
  title: string;
  price: number;
  cat_prefix: string;
  img: string;
  quantity?: number;
  max: number;
  isLiked?: boolean;
  isAuthenticated?: boolean;
};

export type TLoad = {
  data: TProduct[];
};

export type TLottie = {
  type: keyof typeof lottieFilesMap;
  message?: string;
};

export const lottieFilesMap = {
  notFound,
  emptyCart,
  error,
  cartLoading,
  success,
};

export type TGrid<T> = {
  data: T[];
  renderItem: (item: T) => React.ReactNode;
};

export type TObject = {
  itemId?: string;
  type: "cartFullInfo" | "cartListIds" | "wishListFullInfo" | "wishListIds";
};

export interface ICartState {
  items: {
    [key: number]: number;
  };
  productFullInfo: TProduct[];
  loading: TLoading;
  error: null | string;
}

export interface IWishListState {
  itemsId: number[];
  wishListItems: TProduct[];
  loading: TLoading;
  error: null | string;
}

export type TWishList = {
  userId: string;
  productId: number;
  id: number;
};

export type TSuspence = {
  children: React.ReactNode;
  type: keyof typeof lottieFilesMap;
};

export type TFormInputs = z.infer<typeof signUpSchema>;

export type TInput<TFieldValue extends FieldValues> = {
  type?: string;
  label: string;
  register: UseFormRegister<TFieldValue>;
  name: Path<TFieldValue>;
  errors?: string;
  availability?: string;
  pending?: string;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
};

export type TStatus =
  | "idle"
  | "checking"
  | "available"
  | "notAvailable"
  | "failed";

export interface IAuthSlice {
  user: {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
  } | null;
  accessToken: string | null;
}

export type TProductInfo = {
  title: string;
  img: string;
  price: number;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  direction?: "row" | "column";
  quantity?: number;
};

export interface IOrderSlice {
  loading: TLoading;
  error: string | null;
  orderList: TOrderItem[];
}

export type TOrderItem = {
  id: number;
  subTotal: number;
  items: TProduct[];
};

export type TLoading = "idle" | "pending" | "succeeded" | "failed";
