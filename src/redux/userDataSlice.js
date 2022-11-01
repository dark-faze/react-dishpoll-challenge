import { createSlice } from "@reduxjs/toolkit";

export const userDataSlice = createSlice({
  name: "userData",
  initialState:{
    userData : []
  },
  reducers:{
    populateUsers: (state,action)=>{
        state.userData = action.payload;
    }
  }
})

export const { populateUsers } = userDataSlice.actions;
export const selectUserData = (state) => state.userData.userData;
export default userDataSlice.reducer;