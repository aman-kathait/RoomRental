import React from "react";
import { Link } from "react-router-dom";
import { Home, PlusCircle } from "lucide-react";

const AdminDashboard = () => {
  return (
    <div className="mt-16 py-28 w-full bg-linear-to-b from-[#F1F9FF] via-[#F1F9FF] to-white  px-4 md:px-8 lg:px-16 flex flex-col items-center md:items-start">
      <div className="max-w-5xl mx-auto md:mx-24 text-center md:text-left">
        <h1 className="text-[#1E293B] text-3xl md:text-6xl font-bold">
          List Your Room, Find Tenants Faster, Zero Brokerage.
        </h1>

        <p className="text-slate-600 mt-6 md:mt-10 md:text-xl text-base max-w-3xl mx-auto md:mx-0">
          Post your rooms in minutes and connect directly with tenants.
          No agents, no commissions — just honest renting.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start mt-8">
          <Link to="/add-room">
            <button className="flex items-center justify-center gap-2 bg-primary text-white px-7 py-3 rounded-lg hover:bg-blue-800 transition">
              <PlusCircle size={20} />
              List Your Room
            </button>
          </Link>

          <Link to="/manage-rooms">
            <button className="flex items-center justify-center gap-2 border border-primary text-primary px-7 py-3 rounded-lg hover:bg-primary hover:text-white transition">
              <Home size={20} />
              Manage Listings
            </button>
          </Link>
        </div>

        <p className="text-sm md:text-base text-slate-500 mt-10">
          🚀 Trusted by{" "}
          <span className="font-semibold text-primary">1,200+</span> property
          owners across India.
        </p>
      </div>
    </div>
  );
};

export default AdminDashboard;
