import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "userName",
  initialState: {
    userName: "",
  },
  reducers: {
    login: (state, action) => {
      state.userName = action.payload;
    },
    logout: (state) => {
      state.userName = null;
    },
  },
});

export const { login, logout } = userSlice.actions;
export const selectUser = (state) => state.userName.userName;
export default userSlice.reducer;