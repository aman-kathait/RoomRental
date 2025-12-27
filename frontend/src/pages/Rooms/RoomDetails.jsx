import React from "react";
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

const RoomDetails = () => {
  const { roomId } = useParams();
  useGetRoomById(roomId);
  const room = useSelector((state) => state.rooms.roomDetails);
  if (!room) {
  return (
    <div className="mt-24 text-center text-slate-500">
      Loading room details...
    </div>
  );
}

  return (
    <div className="mt-24 max-w-7xl mx-auto px-4 mb-20">
      <div className="mb-10">
        <Carousel className="w-full">
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
              {room.address.city}, {room.address.state} –{" "}
              {room.address.pincode}
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2">Description</h2>
            <p className="text-slate-600 leading-relaxed">
              {room.description}
            </p>
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
              {room.address.city}, {room.address.state} -{" "}
              {room.address.pincode}
            </p>
          </div>
        </div>
        <div className="lg:col-span-4">
          <div className="sticky top-28 bg-white shadow-xl rounded-2xl p-6 space-y-4">
            
            <div>
              <p className="text-3xl font-bold text-slate-900">
                ₹{room.price}
              </p>
              <p className="text-sm text-slate-500">per month</p>
            </div>

            <Button className="w-full bg-primary text-white rounded-xl py-3 font-semibold hover:bg-primary/80" >
              Book Now
            </Button>

            <Button
              variant="outline"
              className="w-full rounded-xl py-3 font-semibold text-red-600 border-red-200 hover:bg-red-50"
            >
              Cancel Booking
            </Button>

            <p className="text-xs text-slate-500 text-center">
              You can cancel anytime before confirmation
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetails;
