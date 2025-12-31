import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  myinquiries: [],
  refresh: false,
};

const inquirySlice = createSlice({
  name: "inquiry",
  initialState,
  reducers: {
    setInquiries: (state, action) => {
      state.myinquiries = action.payload;
    },
    triggerRefresh: (state) => {
      state.refresh = !state.refresh;
    },
    clearInquiries: (state) => initialState,
  },
});

export const { setInquiries, triggerRefresh, clearInquiries } =
  inquirySlice.actions;

export default inquirySlice.reducer;
