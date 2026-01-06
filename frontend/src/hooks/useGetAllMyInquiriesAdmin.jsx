import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setInquiriesAdmin } from "@/redux/slices/inquirySlice";
import { ROOM_INQUIRY_END_POINTS } from "@/utils/constants";
import { useSelector } from "react-redux";
const useGetAllMyInquiriesAdmin = () => {
  const dispatch = useDispatch();
  const refresh = useSelector((state) => state.inquiry.refresh);
  useEffect(() => {
    const fetchInquiries = async () => {
      try {
        const response = await axios.get(`${ROOM_INQUIRY_END_POINTS}/myinquiries`, {
          withCredentials: true,
        });
        if (response.data.success) {
          dispatch(setInquiriesAdmin(response.data.data.inquiries));
        }
      } catch (error) {
        console.error("Error fetching inquiries:", error);
      }
    };
    fetchInquiries();
  },[dispatch, refresh]);
};

export default useGetAllMyInquiriesAdmin;
