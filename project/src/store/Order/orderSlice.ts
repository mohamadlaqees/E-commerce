import { createSlice } from "@reduxjs/toolkit";
import { IOrderSlice } from "@util/types";
import placeOrder from "./act/placeOrder";
import { isString } from "@util/guard";
import getOrders from "./act/getOrders";

const initialState: IOrderSlice = {
  error: null,
  loading: "idle",
  orderList: [],
};

const orderSlice = createSlice({
  name: "orderSlice",
  initialState: initialState,
  reducers: {
    initateState: (state) => {
      state.loading = "idle";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(placeOrder.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(placeOrder.fulfilled, (state) => {
      state.loading = "succeeded";
      state.error = null;
    });
    builder.addCase(placeOrder.rejected, (state, action) => {
      state.loading = "failed";
      if (isString(action.payload)) {
        state.error = action.payload;
      }
    });

    builder.addCase(getOrders.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(getOrders.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.error = null;
      state.orderList = action.payload;
    });
    builder.addCase(getOrders.rejected, (state, action) => {
      state.loading = "failed";
      if (isString(action.payload)) {
        state.error = action.payload;
      }
    });
  },
});

export default orderSlice.reducer;
export const { initateState } = orderSlice.actions;
