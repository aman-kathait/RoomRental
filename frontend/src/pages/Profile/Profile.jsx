import React from "react";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
const Profile = () => {
  const user = useSelector((state) => state.user.user);
  return (
    <div className="mt-24 max-w-4xl mx-auto px-4 mb-20">
      <div className="bg-white shadow-xl rounded-2xl p-6 sm:p-10">

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-10">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              My Profile
            </h1>
            <p className="text-slate-500 mt-1">
              Manage your personal information
            </p>
          </div>

          <Button className="mt-4 sm:mt-0 bg-primary text-white rounded-xl px-6">
            Edit Profile
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">

          <div>
            <p className="text-sm text-slate-500">Full Name</p>
            <p className="text-lg font-medium text-slate-900">
              {user.fullName}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-500">Email</p>
            <p className="text-lg font-medium text-slate-900">
              {user.email}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-500">Contact Number</p>
            <p className="text-lg font-medium text-slate-900">
              {user.contactNumber}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-500">Role</p>
            <span className="inline-block mt-1 rounded-full bg-primary/10 text-primary px-4 py-1 text-sm font-semibold capitalize">
              {user.role}
            </span>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Profile;
