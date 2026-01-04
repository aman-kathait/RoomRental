import {useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setAllRooms } from "../redux/slices/roomSlice";
import { ROOM_END_POINT_USER } from "@/utils/constants";
import { useSelector } from "react-redux";
const useGetAllRooms = () => {
    const dispatch = useDispatch();
    const refresh = useSelector((state) => state.rooms.refresh);
    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const response = await axios.get(`${ROOM_END_POINT_USER}/get-all-rooms`, {
                    withCredentials: true,
                });
                if (response.data.success) {
                    dispatch(setAllRooms(response.data.data.rooms));
                }
            } catch (error) {
                console.error("Error fetching rooms:", error);
            }
        };

        fetchRooms();
    }, [dispatch, refresh]);
};
export default useGetAllRooms;
