import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import UpdateProfileDialog from "./UpdateProfileDialog";
import InquiriesTable from "./InquiriesTable";
const Profile = () => {
  const user = useSelector((state) => state.user.user);
  const [open, setOpen] = useState(false);

  if (!user) {
    return <div className="mt-24 text-center text-slate-500">Loading profile...</div>;
  }

  return (
    <div className="mt-24 min-h-screen w-full px-6 sm:px-12 lg:px-24">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b pb-6 mb-10">
        <div>
          <h1 className="text-4xl font-bold text-slate-900">My Profile</h1>
          <p className="text-slate-500 mt-2">
            Manage your personal information
          </p>
        </div>

        <Button
          onClick={() => setOpen(true)}
          className="mt-4 sm:mt-0 bg-primary text-white rounded-xl px-8"
        >
          Edit Profile
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-10 gap-x-20 mb-16">
        <div>
          <p className="text-sm text-slate-500 uppercase tracking-wide">
            Full Name
          </p>
          <p className="mt-1 text-xl font-medium text-slate-900">
            {user.fullName}
          </p>
        </div>

        <div>
          <p className="text-sm text-slate-500 uppercase tracking-wide">
            Email
          </p>
          <p className="mt-1 text-xl font-medium text-slate-900">
            {user.email}
          </p>
        </div>

        <div>
          <p className="text-sm text-slate-500 uppercase tracking-wide">
            Contact Number
          </p>
          <p className="mt-1 text-xl font-medium text-slate-900">
            {user.contactNumber}
          </p>
        </div>

        <div>
          <p className="text-sm text-slate-500 uppercase tracking-wide">
            Role
          </p>
          <span className="inline-flex mt-2 items-center rounded-full bg-primary/10 text-primary px-5 py-1.5 text-sm font-semibold capitalize">
            {user.role}
          </span>
        </div>
      </div>
      
      <div className="border-t pt-10">
        <InquiriesTable user={user} />
      </div>

      <UpdateProfileDialog open={open} onOpenChange={setOpen} />
    </div>
  );
};

export default Profile;
