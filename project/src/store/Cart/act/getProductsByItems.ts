import { createAsyncThunk } from "@reduxjs/toolkit";
import { TObject, TProduct, TWishList } from "@util/types";
import { RootState } from "@store/index";
import axios from "axios";

export const getProductsByItems = createAsyncThunk(
  "cartSlice/getProductsByItems",
  async (object: TObject, thunkAPI) => {
    const { rejectWithValue, fulfillWithValue, signal, getState } = thunkAPI;
    const { authSlice } = getState() as RootState;

    if (object.itemId !== undefined) {
      if (object.itemId.length === 0) {
        return fulfillWithValue([]);
      }
    }

    try {
      const response = await axios.get<TProduct[] | TWishList[]>(
        `http://localhost:4000/${
          object.type === "wishListIds"
            ? "wishList"
            : object.type === "cartListIds"
            ? "cartList"
            : "products"
        }?${
          object.type === "wishListIds"
            ? `userId=${authSlice.user?.id}`
            : object.type === "cartListIds"
            ? `userId=${authSlice.user?.id}`
            : object.itemId
        }`,
        { signal }
      );
      if (object.type === "wishListIds") {
        const id = response.data.map((id) => {
          if ("productId" in id) {
            return id.productId;
          }
        });
        return { data: id, type: object.type };
      } else if (object.type === "cartListIds") {
        const id = response.data.map((id) => {
          if ("productId" in id) {
            return id.productId;
          }
        });
        return { data: id, type: object.type };
      }
      return { data: response.data, type: object.type };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data.message || error.message);
      }
      return rejectWithValue(error);
    }
  }
);
