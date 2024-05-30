import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@store/index";
import axios from "axios";

const placeOrder = createAsyncThunk(
  "orderSlice/placeOrder",
  async (subTotal: number, ThunkAPI) => {
    const { rejectWithValue, getState } = ThunkAPI;
    const { authSlice, cartSlice } = getState() as RootState;

    const orderItem = cartSlice.productFullInfo.map((el) => ({
      id: el.id,
      title: el.title,
      price: el.price,
      img: el.img,
      quantity: cartSlice.items[el.id],
    }));

    try {
     await axios.post("http://localhost:4000/orders", {
        userId: authSlice.user?.id,
        items: orderItem,
        subTotal,
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data.message || error.message);
      }
      return rejectWithValue(error);
    }
  }
);
export default placeOrder;
