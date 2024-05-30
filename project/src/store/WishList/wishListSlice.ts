import { createSlice } from "@reduxjs/toolkit";
import { IWishListState, TProduct } from "@util/types";
import likeToggle from "./act/LikeToggle";
import { getProductsByItems } from "@store/Cart/act/getProductsByItems";
import { isString } from "@util/guard";
import { logout } from "@store/Auth/authSlice";

const initialState: IWishListState = {
  itemsId: [],
  wishListItems: [],
  error: null,
  loading: 'idle',
};

const wishListSlice = createSlice({
  name: "wishListSlice",
  initialState: initialState,
  reducers: {
    clearWishListItems: (state) => {
      state.wishListItems = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(likeToggle.pending, (state) => {
      state.error = null;
    });
    builder.addCase(likeToggle.fulfilled, (state, action) => {
      if (action.payload.type === "add") {
        state.itemsId.push(action.payload.id);
      } else {
        state.itemsId = state.itemsId.filter((id) => id !== action.payload.id);
      }
    });
    builder.addCase(likeToggle.rejected, (state, action) => {
      if (action.payload && typeof action.payload === "string") {
        state.error = action.payload;
      }
    });

    builder.addCase(getProductsByItems.pending, (state) => {
      state.loading = 'pending';
      state.error = null;
    });
    builder.addCase(getProductsByItems.fulfilled, (state, action) => {
      state.loading = 'succeeded';
      state.error = null;
      if (
        "type" in action.payload &&
        action.payload.type === "wishListFullInfo" &&
        action.payload.data[0].id !== null
      ) {
        state.wishListItems = action.payload.data as TProduct[];
      } else if (
        "type" in action.payload &&
        action.payload.type === "wishListIds"
      ) {
        state.itemsId = action.payload.data as number[];
      }
    });
    builder.addCase(getProductsByItems.rejected, (state, action) => {
      state.loading = 'failed';
      if (isString(action.payload)) {
        state.error = action.payload;
      }
    });

    // when logout reset
    builder.addCase(logout, (state) => {
      state.itemsId = [];
      state.wishListItems = [];
    });
  },
});

export default wishListSlice.reducer;
export const { clearWishListItems } = wishListSlice.actions;
