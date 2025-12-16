import React from "react";
import { Button } from "@/components/ui/button";

const RoomCard = () => {
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">

      {/* Image */}
      <div className="h-48 w-full">
        <img
          src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2"
          alt="Room"
          className="h-full w-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-4 space-y-2">
        <h3 className="text-lg font-semibold text-slate-800">
          Sunrise Residency
        </h3>

        <p className="text-sm text-slate-500">
          Dehradun, 248001
        </p>

        <div className="flex items-center justify-between mt-3">
          <span className="text-primary font-bold text-lg">
            ₹8,500 / month
          </span>
        </div>

        <Button className="w-full mt-3">
          Book Now
        </Button>
      </div>
    </div>
  );
};

export default RoomCard;
