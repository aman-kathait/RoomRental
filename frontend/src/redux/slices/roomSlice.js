import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allRooms: [],
  roomDetails: null,
  searchRooms: [],
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
  },
});

export const { setAllRooms, clearAllRooms, setRoomDetails, clearRoomDetails, setSearchRooms, clearSearchRooms } =
  roomSlice.actions;

export default roomSlice.reducer;
