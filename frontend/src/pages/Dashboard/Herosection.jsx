import React from "react";
import { Link } from "react-router-dom";

const Herosection = () => {
  return (
    <div className="flex flex-col-reverse md:flex-row md:justify-around md:pt-25 md:px-30 bg-linear-to-b from-[#F1F9FF] via-[#F1F9FF] to-white md:pb-30">
      <div className="md:w-1/2 md:space-y-2">
        <h1 className="text-[#1E293B] text-center md:text-left text-2xl md:text-6xl font-bold mt-6 md:mt-0">
          Real People,
        </h1>
        <h1 className="text-[#1E293B] text-center md:text-left text-2xl md:text-6xl font-bold ">
          Trusted Rooms,
        </h1>
        <h1 className="text-primary text-center md:text-left text-2xl md:text-6xl font-bold ">
          Zero Middlemen.
        </h1>
        <p className="text-slate-600 md:mt-12 md:pr-20 md:text-xl text-sm p-8 md:p-0 text-center md:text-left">
          Connect directly with room owners. Zero brokers, zero platform fees —
          rent honestly and transparently.
        </p>
        <div className="flex justify-center md:justify-start">
          <Link to="/rooms">
            <button className="md:mt-8 bg-primary text-white px-6 py-3 rounded-lg hover:bg-blue-800 transition duration-300 ">
              Find Your Perfect Room
            </button>
          </Link>
        </div>
        <p className="text-sm md:text-base text-slate-500 mt-8 text-center md:text-left">
          ⭐⭐⭐⭐⭐ Trusted by{" "}
          <span className="font-semibold text-primary">5,000+</span> tenants &
          landlords across India.
        </p>
      </div>

      {/* Right Side */}
      <div className="md:w-1/2 mt-18 md:mt-0 px-2 md:px-0 md:pt-0 flex justify-center">
        <div className="">
          <img
            src="Test1.jpg"
            alt=""
            srcset=""
            className="rounded-2xl shadow-xl px-2 h-60 md:h-100 md:px-0"
          />
        </div>
      </div>
    </div>
  );
};

export default Herosection;
