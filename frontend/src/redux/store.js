import {configureStore} from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import roomReducer from './slices/roomSlice';
import userReducer from './slices/userSlice';
export const store=configureStore({
    reducer:{
        auth:authReducer,
        rooms:roomReducer,
        user:userReducer,
    },
});

export default store;