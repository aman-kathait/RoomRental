import React,{ useState} from "react";
import { useSelector } from "react-redux";
import RoomCard from "../Rooms/RoomCard";
import useGetAllRooms from "@/hooks/useGetAllRooms";
import EditRoom from "./EditRoom";
import { useDispatch } from "react-redux";
import { clearRoomDetails } from "@/redux/slices/roomSlice";
import useGetRoomById from "@/hooks/useGetRoomById";
const ManageRoom = () => {
  const dispatch = useDispatch();
  const rooms = useSelector((state) => state.rooms.allRooms);
  const user = useSelector((state) => state.user.user);
  const[selectedRoomId,setSelectedRoomId]=useState(null);
  useGetAllRooms();
  const[open,setOpen]=useState(false);
  
  return (
    <div className="mt-35 sm:px-30 px-10">
      <h1 className="text-2xl sm:text-4xl text-slate-800 font-bold">
        Manage Your Rooms
      </h1>
      <p className="mb-6 mt-4 text-slate-600">
        Here you can manage all the rooms you have listed.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {rooms &&
          rooms.map((room) => {
            if (room.owner._id === user._id) {
              return (
                <RoomCard
                  key={room._id}
                  {...room}
                  title="Edit Room"
                  owner="yes"
                  onEdit={() => {
                    setSelectedRoomId(room._id);
                    setOpen(true);
                  }}
                />

              );
            }
          })}
      </div>
      <EditRoom open={open} onOpenChange={setOpen} roomId={selectedRoomId} />
    </div>
  );
};

export default ManageRoom;
