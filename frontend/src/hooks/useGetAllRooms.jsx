import {useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setAllRooms,setPagination } from "../redux/slices/roomSlice";
import { ROOM_END_POINT_USER } from "@/utils/constants";
import { useSelector } from "react-redux";
const useGetAllRooms = (page) => {
    const dispatch = useDispatch();
    const refresh = useSelector((state) => state.rooms.refresh);
    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const response = await axios.get(`${ROOM_END_POINT_USER}/get-all-rooms?page=${page}&limit=6`, {
                    withCredentials: true,
                });
                if (response.data.success) {
                    dispatch(setAllRooms(response.data.data.rooms));
                    dispatch(setPagination(response.data.data.pagination));
                }
            } catch (error) {
                console.error("Error fetching rooms:", error);
            }
        };

        fetchRooms();
    }, [dispatch, refresh, page]);
};
export default useGetAllRooms;
