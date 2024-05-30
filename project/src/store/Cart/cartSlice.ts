import { createSelector, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "@store/index";
import { ICartState } from "@util/types";
import { getProductsByItems } from "./act/getProductsByItems";
import { isString } from "@util/guard";
import { logout } from "@store/Auth/authSlice";
import removeCartItem from "./act/removeCartItem";
import addToCart from "./act/addToCart";

const initialState: ICartState = {
  items: {},
  productFullInfo: [],
  loading: "idle",
  error: null,
};
const cartSlice = createSlice({
  name: "cartSlice",
  initialState,
  reducers: {
    changeQuantity: (state, action) => {
      state.items[action.payload.id] = action.payload.quantity;
    },
    clearproductFullInfo: (state) => {
      state.productFullInfo = [];
      state.items = {};
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getProductsByItems.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(getProductsByItems.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.error = null;
      if (
        "type" in action.payload &&
        action.payload.type === "cartFullInfo" &&
        action.payload.data[0].id !== null 
      ) {
        state.productFullInfo = action.payload.data;
      } else if (
        "type" in action.payload &&
        action.payload.type === "cartListIds"
      ) {
        action.payload.data.map((id) => {
          if (id !== undefined) {
            if (state.items[id]) {
              state.items[id]++;
            } else {
              state.items[id] = 1;
            }
          }
        });
      } else {
        state.productFullInfo = [];
      }
    });
    builder.addCase(getProductsByItems.rejected, (state, action) => {
      state.loading = "failed";
      if (isString(action.payload)) {
        state.error = action.payload;
      }
    });

    builder.addCase(addToCart.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(addToCart.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.error = null;

      if (state.items[action.payload.id]) {
        state.items[action.payload.id]++;
      } else {
        state.items[action.payload.id] = 1;
      }
    });
    builder.addCase(addToCart.rejected, (state, action) => {
      state.loading = "failed";
      if (isString(action.payload)) {
        state.error = action.payload;
      }
    });

    builder.addCase(removeCartItem.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(removeCartItem.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.error = null;
      if (action.payload!.type === "remove") {
        if (state.items[action.payload!.id!] !== 1) {
          state.items[action.payload!.id!]--;
        } else {
          delete state.items[action.payload!.id!];
        }
      }
    });
    builder.addCase(removeCartItem.rejected, (state, action) => {
      state.loading = "failed";
      if (isString(action.payload)) {
        state.error = action.payload;
      }
    });

    // when logout reset
    builder.addCase(logout, (state) => {
      state.items = {};
      state.productFullInfo = [];
    });
  },
});

const numOfItems = createSelector(
  (state: RootState) => state.cartSlice.items,
  (items) => {
    const num = Object.values(items).reduce((acc, curr) => acc + curr, 0);
    return num;
  }
);

export { numOfItems };
export const { changeQuantity, clearproductFullInfo } = cartSlice.actions;
export default cartSlice.reducer;
