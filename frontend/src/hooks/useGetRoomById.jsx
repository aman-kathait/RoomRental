import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setRoomDetails } from "@/redux/slices/roomSlice";
import { ROOM_END_POINT_USER } from "@/utils/constants";

const useGetRoomById=(roomId)=>{
    const dispatch=useDispatch();
    useEffect(()=>{
        if (!roomId) return;
        const fetchRoom = async ()=>{
            try {
                const response=await axios.get(`${ROOM_END_POINT_USER}/get-room/${roomId}`,{
                    withCredentials:true,
                });
                if(response.data.success){
                    dispatch(setRoomDetails(response.data.data.room));
                }
            } catch (error) {
                console.error("Error while fetching single room",error);
            }
        }
        fetchRoom();
    },[roomId, dispatch]);
};

export default useGetRoomById;