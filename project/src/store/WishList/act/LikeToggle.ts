import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@store/index";
import axios from "axios";

const likeToggle = createAsyncThunk(
  "wishList/likeToggle",
  async (id: number, ThunkAPI) => {
    const { rejectWithValue, getState } = ThunkAPI;

    const { authSlice } = getState() as RootState;
    try {
      const isRecordExist = await axios.get(
        `http://localhost:4000/wishList?userId=${authSlice.user?.id}&productId=${id}`
      );
      if (isRecordExist.data.length > 0) {
        await axios.delete(
          `http://localhost:4000/wishList/${isRecordExist.data[0].id}`
        );
        return { type: "remove", id };
      } else {
        await axios.post(`http://localhost:4000/wishList`, {
          userId: authSlice.user?.id,
          productId: id,
        });
        return { type: "add", id };
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data.message || error.message);
      }
      return rejectWithValue(error);
    }
  }
);

export default likeToggle;
