import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@store/index";
import axios from "axios";

const addToCart = createAsyncThunk(
  "cartSlice/addToCart",
  async (id: number, ThunkAPI) => {
    const { rejectWithValue, getState } = ThunkAPI;

    const { authSlice } = getState() as RootState;
    try {
      await axios.post(`http://localhost:4000/cartList`, {
        userId: authSlice.user?.id,
        productId: id,
      });
      return { id };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data.message || error.message);
      }
      return rejectWithValue(error);
    }
  }
);

export default addToCart;
