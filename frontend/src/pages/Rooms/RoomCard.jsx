import React, { useEffect,useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { removeRoom } from "@/services/roomService";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { triggerRefreshRooms } from "@/redux/slices/roomSlice";
const RoomCard = ({ title,owner, onEdit, ...room }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const deleteRoom=async (roomId)=>{
    try {
      const response=await removeRoom(roomId);
      if (response.data.success) {
        toast.success("Room Removed Successfully");
        dispatch(triggerRefreshRooms());
      }
    } catch (error) {
      toast.error("Failed to delete room");
      console.error("Error cancelling booking:",error);
    }
  }
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
            <span className="text-sm font-normal text-slate-500">
              {" "}
              /per month{" "}
            </span>
          </span>
        </div>

        {title &&
          (title === "Edit Room" ? (
            <>
            <Button className="w-full mt-3" onClick={onEdit}>Edit Room</Button>
            </>
          ) : (
            <Button
              className="w-full mt-3"
              onClick={() => navigate(`/get-room/${room._id}`)}
            >
              Book Now
            </Button>
          ))}

          {owner && owner==="yes" ? <> <Button className="w-full mt-3 bg-red-400 hover:bg-red-500" onClick={() => deleteRoom(room._id)}>Delete Room</Button></> : null}
      </div>
    </div>
  );
};

export default RoomCard;
