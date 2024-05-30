import { createSlice } from "@reduxjs/toolkit";
import { IAuthSlice } from "@util/types";

const initialState: IAuthSlice = {
  accessToken: null,
  user: null,
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    saveToken: (state, action) => {
      state.accessToken = action.payload.token;
    },
    addUser: (state, action) => {
      state.user = action.payload.user;
    },
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
    },
  },
});

export default authSlice.reducer;
export const { saveToken, addUser, logout } = authSlice.actions;
