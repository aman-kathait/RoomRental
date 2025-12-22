import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  rooms: [],
  selectedRoom: null,
};

const roomSlice = createSlice({
  name: "rooms",
  initialState,
  reducers: {
    setRooms: (state, action) => {
      state.rooms = action.payload;
    },
    setSelectedRoom: (state, action) => {
      state.selectedRoom = action.payload;
    },
    clearSelectedRoom: (state) => {
      state.selectedRoom = null;
    },
  },
});

export const { setRooms, setSelectedRoom, clearSelectedRoom } =
  roomSlice.actions;

export default roomSlice.reducer;
