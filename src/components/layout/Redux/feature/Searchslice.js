import { createSlice } from "@reduxjs/toolkit";
const AddUser = createSlice({
  name: "adduser",
  initialState: {
    Searchdata: [],
  },

  reducers: {
    searchUser: (state, action) => {
      state.Searchdata = action.payload;
    },
  },
});

export default AddUser.reducer;
export const { searchUser } = AddUser.actions;