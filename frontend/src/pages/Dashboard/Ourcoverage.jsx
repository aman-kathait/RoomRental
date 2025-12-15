import React from "react";
import CoverageBox from "./CoverageBox";
import { MapPinned,ShieldUser, User,House  } from 'lucide-react';
const Ourcoverage = () => {
  return (
    <div className="bg-[#F8FAFC] px-6 py-8 md:px-30 md:py-20">
      <div>
        <h1 className="text-[#1E293B] text-xl md:text-[44px] font-bold">Our Coverage</h1>
        <p className="text-slate-600 md:text-lg">
          From room discovery to direct owner contact — everything under one
          roof.
        </p>
      </div>

      <div >
        <div className="grid sm:grid-cols-2 md:grid-cols-4 md:gap-6 mt-4">
          <CoverageBox
            title="Pincodes Covered"
            text="Successfully covered 500+ areas across cities."
            Icon={MapPinned}
          />
          <CoverageBox
            title="Landlords Registered"
            text="Successfully registered 200+ landlords across cities."
            Icon={ShieldUser}
          />
          <CoverageBox
            title="Rooms Listed"
            text="Successfully listed 1000+ rooms across multiple cities."
            Icon={House}
          />
          <CoverageBox
            title=" Tenants Served"
            text="Successfully registered 800+ tenants across multiple cities."
            Icon={User}
          />
        </div>
      </div>
    </div>
  );
};

export default Ourcoverage;
