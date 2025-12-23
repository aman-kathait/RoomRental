import axiosClient from "@/utils/axiosClient";
import { USER_API_END_POINT } from "@/utils/constants";

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