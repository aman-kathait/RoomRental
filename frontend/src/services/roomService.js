import axiosClient from "@/utils/axiosClient";
import { ROOM_END_POINT_ADMIN } from "@/utils/constants";
export const removeRoom=(roomId)=>{
    return axiosClient.delete(`${ROOM_END_POINT_ADMIN}/delete-room/${roomId}`);
}