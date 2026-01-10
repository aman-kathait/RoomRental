import React, { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import useGetRoomById from "@/hooks/useGetRoomById";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { contactOwner, removeContact } from "@/services/inquiryService";
import useGetAllMyInquiries from "@/hooks/useGetAllMyInquiries";
import { useDispatch } from "react-redux";
import { triggerRefresh } from "@/redux/slices/inquirySlice";
import { User, Phone } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
const RoomDetails = () => {
  useGetAllMyInquiries();
  const dispatch = useDispatch();
  const userInquiries = useSelector((state) => state.inquiry.myinquiries);
  const { roomId } = useParams();
  useGetRoomById(roomId);
  const room = useSelector((state) => state.rooms.roomDetails);
  const [loading, setLoading] = useState(false);
  const inquiryForRoom = room
    ? userInquiries.find(
        (inq) => inq.room === room._id || inq.room?._id === room._id
      )
    : null;

  const booked = Boolean(inquiryForRoom);

  if (!room) {
    return (
      <div className="mt-24 text-center text-slate-500">
        Loading room details...
      </div>
    );
  }
  const booking = async (roomId, message) => {
    setLoading(true);
    try {
      const response = await contactOwner({ roomId, message });
      if (response.data.success) {
        dispatch(triggerRefresh());
        console.log("Room Booked Successfully");
      }
    } catch (error) {
      console.error("Error booking the room:", error);
    }finally{
      setLoading(false);
    }
  };

  const cancelBooking = async (inquiryId) => {
    setLoading(true);
    try {
      await removeContact(inquiryId);
      dispatch(triggerRefresh());
      console.log("Booking cancelled");
    } catch (error) {
      console.error("Error cancelling booking:", error);
    }finally{
      setLoading(false);
    }
  };

  return (
    <div className="mt-24 max-w-7xl mx-auto px-4 mb-20">
      <div className="mb-10 gap-6">
        <Carousel className="">
          <CarouselContent>
            {room.images.map((img, idx) => (
              <CarouselItem key={idx}>
                <img
                  src={img.url}
                  alt={`Room image ${idx + 1}`}
                  className="w-full h-[260px] sm:h-[360px] md:h-[420px] object-cover rounded-2xl"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-4" />
          <CarouselNext className="right-4" />
        </Carousel>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              {room.propertyName}
            </h1>
            <p className="text-slate-600 mt-1">
              {room.address.city}, {room.address.state} – {room.address.pincode}
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2">Description</h2>
            <p className="text-slate-600 leading-relaxed">{room.description}</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">Amenities</h2>
            <div className="flex flex-wrap gap-3">
              {room.amenities.map((amenity) => (
                <span
                  key={amenity}
                  className="px-4 py-2 bg-slate-100 rounded-xl text-sm font-medium text-slate-700"
                >
                  {amenity}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2">Address</h2>
            <p className="text-slate-600">
              {room.address.addressLine1}, {room.address.landmark},{" "}
              {room.address.city}, {room.address.state} - {room.address.pincode}
            </p>
          </div>
        </div>
        <div className="lg:col-span-4">
          <div className="sticky top-28 bg-white shadow-xl rounded-2xl p-6 space-y-4">
            <div>
              <p className="text-3xl font-bold text-slate-900">₹{room.price}</p>
              <p className="text-sm text-slate-500">per month</p>
            </div>
            {loading && (
              <div className="flex justify-center mt-2 text-blue-600">
                <Spinner className="mr-2 h-5 w-5" /> Please wait...
              </div>
            )}
            {booked ? (
              <Button
                disabled={loading}
                variant="outline"
                className="w-full rounded-xl py-3 font-semibold text-red-600"
                onClick={() => cancelBooking(inquiryForRoom._id)}
              >
                Cancel Booking
              </Button>
            ) : (
              <Button
              disabled={loading}
                className="w-full bg-primary text-white rounded-xl py-3 font-semibold"
                onClick={() =>
                  booking(room._id, "I am interested in this room")
                }
              >
                Book Now
              </Button>
            )}
            
            <p className="text-xs text-slate-500 text-center">
              You can cancel booking confirmation
            </p>
            <div className="mt-6 sm:mt-0 flex items-center">
              <div className="w-full bg-white border border-gray-200 rounded-2xl p-6 shadow-md">
                <h3 className="text-xl font-semibold mb-6">Owner Details</h3>

                <div className="flex items-center gap-4 mb-5">
                  <div className="p-3 rounded-full bg-gray-100">
                    <User className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Owner Name</p>
                    <p className="font-medium text-gray-900">
                      {room.owner.fullName}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-full bg-gray-100">
                    <Phone className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email: </p>
                    <p className="font-medium text-gray-900">{room.owner.email}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetails;
