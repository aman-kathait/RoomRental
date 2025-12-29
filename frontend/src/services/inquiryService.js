import axiosClient from "@/utils/axiosClient";
import { ROOM_INQUIRY_END_POINTS } from "@/utils/constants";
import axios from "axios";

export const contactOwner=(data)=>{
    return axiosClient.post(`${ROOM_INQUIRY_END_POINTS}/contact`,data);
}
export const removeContact=(inquiryId)=>{
    return axiosClient.delete(`${ROOM_INQUIRY_END_POINTS}/removecontact`,{ data: { inquiryId } });
}