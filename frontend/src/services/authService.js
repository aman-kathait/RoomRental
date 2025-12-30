import axiosClient from "@/utils/axiosClient";
import { USER_API_END_POINT } from "@/utils/constants";
import { data } from "react-router-dom";

export const registerUser=(data)=>{
    return axiosClient.post(`${USER_API_END_POINT}/register`,data);
}

export const loginUser=(data)=>{
    return axiosClient.post(`${USER_API_END_POINT}/login`,data);
}

export const getCurrentUser=()=>{
    return axiosClient.get(`${USER_API_END_POINT}/current-user`);
}

export const logoutUser=()=>{
    return axiosClient.post(`${USER_API_END_POINT}/logout`);
}

export const updateProfile=(userId,data)=>{
    return axiosClient.put(`${USER_API_END_POINT}/update-profile/${userId}`,data);
}