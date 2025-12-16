import React from "react";
import { Link } from "react-router-dom";
const CoverageBox = ({ title, Icon, text }) => {
  return (
    <div className="bg-white mx-auto rounded-xl shadow w-70 mt-8 hover:shadow-lg transition-shadow shadow-primary/20">
      <div className="">
        <div className="bg-white rounded-4xl flex flex-col  w-70  p-6">
          <div className="p-3 w-fit rounded-lg border bg-[#E0F2FE] border-slate-300 inline-flex items-center justify-center mb-4 text-primary hover:bg-primary hover:text-white hover:border-primary transition">
            <Icon className="w-5 h-5" strokeWidth={2} />
          </div>

          <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
          <p className="text-gray-600 mt-3">{text}</p>
          <button className="text-left text-primary mt-3 hover:underline hover:text-blue-500">
            <Link to="/rooms">Book your room-{">"}</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoverageBox;
