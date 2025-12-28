import React from "react";
import {useNavigate} from "react-router-dom"
const RoomCard2 = ({ room }) => {
  const navigate=useNavigate();
  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden">
      <div className="relative">
        <img
          src={
            room?.image ||
            "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2"
          }
          alt={room?.title || "Room"}
          className="h-56 w-full object-cover p-4 rounded-2xl"
        />
      </div>

      <div className="p-4 space-y-3">
        <h2 className="text-lg font-semibold text-slate-900 line-clamp-1">
          {room?.propertyName || "Fully Furnished Room"}
        </h2>

        <p className="text-sm text-slate-500">
          📍
          {room.address.city || "Dehradun"}, {room.address.pincode || "248001"}
        </p>

        <p className="text-sm text-slate-600 line-clamp-2">
          {room?.description ||
            "Well-furnished room with good ventilation and nearby public transport."}
        </p>

        <div className="border-t pt-4 flex items-center justify-between">
          <p className="text-lg font-bold text-slate-900">
            ₹{room?.price || "5,500"}
            <span className="text-sm font-normal text-slate-500"> / month</span>
          </p>

          <button className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/80 transition" onClick={()=>navigate(`/get-room/${room._id}`)}>
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoomCard2;
