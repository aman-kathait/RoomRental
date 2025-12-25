import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
const RoomCard = (room) => {
  const navigate = useNavigate();
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
      <div className="h-48 w-full">
        <img
          src={room.images[0].url}
          alt="Room"
          className="h-full w-full object-cover"
        />
      </div>

      <div className="p-4 space-y-2">
        <h3 className="text-lg font-semibold text-slate-800">
          {room.propertyName}
        </h3>

        <p className="text-sm text-slate-500">
          {room.address.city}, {room.address.state}- {room.address.pincode} 📌 
        </p>

        <div className="flex items-center justify-between mt-3">
          <span className="text-primary font-bold text-xm">
            ₹{room.price}
            <span className="text-sm font-normal text-slate-500"> /per month </span>
          </span>
        </div>

        <Button className="w-full mt-3"  onClick={() => navigate(`/get-room/${room._id}`)}>
          Book Now
        </Button>
      </div>
    </div>
  );
};

export default RoomCard;
