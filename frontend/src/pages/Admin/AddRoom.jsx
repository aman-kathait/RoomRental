import React, { use } from 'react'
import { useNavigate } from 'react-router-dom';
const AddRoom = () => {
  const navigate=useNavigate();
  return (
    <div className="mt-35 sm:px-30 px-10">
      <h1 className="text-2xl sm:text-4xl text-slate-800 font-bold">Add New Room</h1>
      <p className="mb-6 mt-4 text-slate-600">Here you can add more rooms to your listings.</p>
     <div className="w-full h-96 flex items-center justify-center border-2 border-dashed border-slate-300 rounded-lg">
      <button onClick={()=>navigate("/add-room-form")}>
        <span className="bg-primary text-white px-4 py-2 rounded-lg">Click Here to add a new room</span>
      </button>
     </div>
    </div>
  )
}

export default AddRoom
