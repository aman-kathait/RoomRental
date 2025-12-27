import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import useGetAllRooms from "@/hooks/useGetAllRooms";
import { useSelector } from "react-redux";
import {useNavigate} from "react-router-dom"
const Rooms = () => {
  useGetAllRooms();
  const navigate=useNavigate();
  const rooms=useSelector((state)=>state.rooms.allRooms.slice(0,6));
  return (
    <div className="px-6 py-8 md:px-30 md:py-20 bg-[#F1F9FF] ">
      <h1 className="text-[#1E293B] text-xl md:text-[44px] font-bold">
        Fresh Listings
      </h1>
      <p className="text-slate-600 md:text-lg mb-4">
        Discover the newest rooms available right now.
      </p>
      <div className="bg-[#F1F9FF] mt-4 mb-4 p-6 sm:p-4">
        <Carousel>
          <CarouselContent>
            {rooms.map((room) => {
              return (
                <CarouselItem className="basis-full sm:basis-1/2 lg:basis-1/3 sm:pl-4" key={room._id}>
                  <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden sm:m-4  sm:p-4">
                  
                    <div className="relative">
                      <img
                       src={room.images?.[0]?.url || "/placeholder-room.jpg"}
                        alt="Room"
                        className="h-56 w-full object-cover sm:rounded-2xl"
                      />
                      <span className="absolute top-3 left-3 bg-primary text-white text-xs font-semibold px-3 py-1 rounded-full">
                        New
                      </span>
                    </div>

                 
                    <div className="p-3 sm:p-5 space-y-3">
                      <h2 className="text-lg font-semibold text-slate-900">
                      {room.propertyName}
                      </h2>

                      <p className="text-sm text-slate-500">📍 {room.address.city}, {room.address.state} - {room.address.pincode}</p>

                      <p className="text-sm text-slate-600 line-clamp-2">
                        {room.description}
                      </p>

                      <div className="border-t pt-4 flex items-center justify-between">
                        <p className="text-lg font-bold text-slate-900">
                          ₹ {room.price}
                          <span className="text-sm font-normal text-slate-500">
                            {" "}
                            / month
                          </span>
                        </p>

                        <button className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition" onClick={() => navigate(`/get-room/${room._id}`)} >
                          Book Now
                        </button>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
};

export default Rooms;
