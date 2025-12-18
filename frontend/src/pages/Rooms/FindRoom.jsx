import React from "react";
import { useNavigate } from "react-router-dom";
import RoomCard2 from "./RoomCard2.jsx";
const FindRoom = () => {
  const navigate = useNavigate();

  const rooms = [];


  return (
    <div className="mt-24 max-w-7xl mx-auto px-4 mb-20 min-h-[70vh]">
    
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-800">
          Search Results
        </h1>
        <p className="text-slate-600 mt-1">
          Rooms available based on your search
        </p>
      </div>

      {rooms.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center mt-24">
          <h2 className="text-xl font-semibold text-slate-800 mb-2">
            No rooms found
          </h2>

          <p className="text-slate-600 mb-6 max-w-md">
            We couldn’t find any rooms matching your search. Try changing
            location or filters.
          </p>

          <button
            onClick={() => navigate("/")}
            className="bg-primary text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary/80 transition"
          >
            Go to Home
          </button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {rooms.map((room) => (
              <RoomCard2 key={room} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default FindRoom;
