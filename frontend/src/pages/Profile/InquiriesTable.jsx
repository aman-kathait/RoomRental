import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useGetAllMyInquiries from "@/hooks/useGetAllMyInquiries";
import { useSelector } from "react-redux";
import { removeContact } from "@/services/inquiryService";
import { useDispatch } from "react-redux";
import { triggerRefresh } from "@/redux/slices/inquirySlice";
import { toast } from "react-toastify";
import { Trash2 } from 'lucide-react';
const InquiriesTable = ({ user }) => {
  const dispatch = useDispatch();
  useGetAllMyInquiries();
  const myInquiries = useSelector((state) => state.inquiry.myinquiries);
  if (!myInquiries) {
    return (
      <div className="mt-24 text-center text-slate-500">
        Loading inquiries...
      </div>
    );
  }
  if (myInquiries.length === 0) {
    return (
      <div className="mt-24 text-center text-slate-500">
        You have no inquiries.
      </div>
    );
  }
  const cancelBooking = async (inquiryId) => {
    try {
      const response = await removeContact(inquiryId);
      dispatch(triggerRefresh());
      if (response.data.statusCode === 200) {
        toast.success("Inquiry deleted successfully 🎉");
      }
    } catch (error) {
      toast.error("Failed to delete inquiry. Please try again.");
      console.error("Error cancelling booking:", error);
    }
  };
  return (
    <Table>
      <TableCaption>A list of your recent invoices </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>S No</TableHead>
          <TableHead>Property Name</TableHead>
          <TableHead>Owner Name</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-center">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {myInquiries.map((inquiry, index) => {
          return (
            <TableRow key={inquiry._id}>
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell>{inquiry.room.propertyName}</TableCell>
              <TableCell>{inquiry.owner?.fullName}</TableCell>
              <TableCell
                className={
                  inquiry.status == "confirmed"
                    ? "bg-green-500 inline-block  px-2 py-1 rounded-sm mt-2 text-white"
                    : inquiry.status === "pending"
                    ? "bg-yellow-500 inline-block px-2 py-1 rounded-sm mt-2 text-white"
                    : inquiry.status === "rejected"
                    ? "bg-red-500 inline-block px-2 py-1 rounded-sm mt-2 text-white"
                    : ""
                }
              >
                {inquiry.status}
              </TableCell>
              <TableCell className="text-center">
                <button
                  className=""
                  onClick={() => cancelBooking(inquiry._id)}
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </button>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default InquiriesTable;
