import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@store/index";
import { TOrderItem } from "@util/types";
import axios from "axios";

const getOrders = createAsyncThunk(
  "orderSlice/getOrders",
  async (_, ThunkAPI) => {
    const { rejectWithValue, getState } = ThunkAPI;
    const { authSlice } = getState() as RootState;

    try {
      const controller = new AbortController();
      const { signal } = controller;
      const response = await axios.get<TOrderItem[]>(
        `http://localhost:4000/orders?userId=${authSlice.user?.id}`,
        { signal }
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data.message || error.message);
      }
      return rejectWithValue(error);
    }
  }
);
export default getOrders;
