import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getTopUsers = createAsyncThunk("users/getTopUsers", async () => {
  const response = await axios.get("http://localhost:5000/users/");
  return response.data;
});

const userSlice = createSlice({
  name: "users",
  initialState: {
    topUsers: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTopUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTopUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.topUsers = action.payload;
      })
      .addCase(getTopUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;
