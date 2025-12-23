import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  isAuthenticated: false,
  accessToken: null,
};

const authSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{
        login:(state,action)=>{
            state.isAuthenticated=true;
            state.accessToken=action.payload;
        },
        logout:()=>initialState,
    },
});

export const {login,logout}=authSlice.actions;
export default authSlice.reducer;