import { createSlice } from "@reduxjs/toolkit";
import { triggerRefresh } from "./inquirySlice";

const initialState = {
  allRooms: [],
  roomDetails: null,
  searchRooms: [],
  refresh: false,
};

const roomSlice = createSlice({
  name: "rooms",
  initialState,
  reducers: {
    setAllRooms: (state, action) => {
      state.allRooms = action.payload;
    },
    clearAllRooms: (state) => {
      state.allRooms = [];
    },
    setRoomDetails: (state, action) => {
      state.roomDetails = action.payload;
    },
    clearRoomDetails: (state) => {
      state.roomDetails = null;
    },
    setSearchRooms:(state,action)=>{
      state.searchRooms=action.payload;
    },
    clearSearchRooms:(state)=>{
      state.searchRooms=[];
    },
    triggerRefreshRooms: (state) => {
      state.refresh = !state.refresh;
    },
  },
});

export const { setAllRooms, clearAllRooms, setRoomDetails, clearRoomDetails, setSearchRooms, clearSearchRooms, triggerRefreshRooms } =
  roomSlice.actions;

export default roomSlice.reducer;
