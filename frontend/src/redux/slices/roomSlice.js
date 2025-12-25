import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allRooms: [],
  roomDetails: null,
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
  },
});

export const { setAllRooms, clearAllRooms, setRoomDetails, clearRoomDetails } =
  roomSlice.actions;

export default roomSlice.reducer;
