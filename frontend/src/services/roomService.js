import axiosClient from "@/utils/axiosClient";
import { ROOM_END_POINT_ADMIN } from "@/utils/constants";
export const removeRoom=(roomId)=>{
    return axiosClient.delete(`${ROOM_END_POINT_ADMIN}/delete-room/${roomId}`);
}

export const addRoom=(roomData)=>{
    return axiosClient.post(`${ROOM_END_POINT_ADMIN}/add-room`,roomData,{
        headers:{
            'Content-Type':'multipart/form-data'
        }
    });
}

export const updateRoom=(roomId,roomData)=>{
    return axiosClient.put(`${ROOM_END_POINT_ADMIN}/edit-room/${roomId}`,roomData,
    );

}

