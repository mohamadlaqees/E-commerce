import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@store/index";
import { TWishList } from "@util/types";
import axios from "axios";

const removeCartItem = createAsyncThunk(
  "cartSlice/removeCartItem",
  async (object: { id?: number; type: "remove" | "removeAll" }, ThunkAPI) => {
    const { rejectWithValue, getState } = ThunkAPI;

    const { authSlice } = getState() as RootState;
    try {
      if (object.type === "remove") {
        const isRecordExist = await axios.get(
          `http://localhost:4000/cartList?userId=${authSlice.user?.id}&productId=${object.id}`
        );
        if (isRecordExist.data.length > 0) {
          await axios.delete(
            `http://localhost:4000/cartList/${isRecordExist.data[0].id}`
          );
          return { id: object.id, type: "remove" };
        }
      } else if (object.type === "removeAll") {
        const isRecordExist = await axios.get(
          `http://localhost:4000/cartList?userId=${authSlice.user?.id}`
        );
        if (isRecordExist.data.length > 0) {
          isRecordExist.data.map(async (item: TWishList) => {
            await axios.delete(`http://localhost:4000/cartList/${item.id}`);
          });
          return { type: "removeAll" };
        }
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data.message || error.message);
      }
      return rejectWithValue(error);
    }
  }
);

export default removeCartItem;
