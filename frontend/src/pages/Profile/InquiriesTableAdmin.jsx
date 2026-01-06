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
import useGetAllMyInquiriesAdmin from "@/hooks/useGetAllMyInquiriesAdmin";
import { useSelector } from "react-redux";
import { removeContact } from "@/services/inquiryService";
import { useDispatch } from "react-redux";
import { triggerRefresh } from "@/redux/slices/inquirySlice";
import { toast } from "react-toastify";
import { SquarePen } from 'lucide-react';
import { useState } from "react";
import UpdateInquiryStatus from "./UpdateInquiryStatus";
const InquiriesTableAdmin = ({ user }) => {
  const dispatch = useDispatch();
  useGetAllMyInquiriesAdmin();
  const myInquiries = useSelector((state) => state.inquiry.myinquiriesadmin);
  const [open,setOpen]=useState(false);  
  const [selectedInquiryId, setSelectedInquiryId] = useState(null);
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
    <>
    <Table>
      <TableCaption>A list of your recent invoices </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>S No</TableHead>
          <TableHead>Property Name</TableHead>
          <TableHead>User Name</TableHead>
          <TableHead>Contact Number</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {myInquiries.map((inquiry, index) => {
          return (
            <TableRow key={inquiry._id}>
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell>{inquiry.room.propertyName}</TableCell>
              <TableCell>{inquiry.user?.fullName}</TableCell>
              <TableCell>{inquiry.user?.contactNumber}</TableCell>
              <TableCell
                className={
                  inquiry.status == "confirmed"
                    ? "bg-green-500 inline-block  px-2 py-1 rounded-sm mt-2 text-white"
                    : inquiry.status === "pending"
                    ? "bg-yellow-500 inline-block px-2 py-1 rounded-sm mt-2 text-white"
                    : inquiry.status === "cancelled"
                    ? "bg-red-500 inline-block px-2 py-1 rounded-sm mt-2 text-white"
                    : ""
                }
              >
                {inquiry.status}
              </TableCell>
              <TableCell className="">
                <button
                  className="flex items-center justify-center gap-2"
                  onClick={() => {setOpen(true); setSelectedInquiryId(inquiry._id);}}
                >
                  <SquarePen className="h-4 w-4 text-blue-500" /> Edit
                </button>
              </TableCell>
            </TableRow>
          );
        })}
       
      </TableBody>
    </Table>
    <div>
     <UpdateInquiryStatus inquiryId={selectedInquiryId} open={open} onOpenChange={setOpen} />
    </div>
    </>
    
    
  );
};

export default InquiriesTableAdmin;
