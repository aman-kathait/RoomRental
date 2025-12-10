import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Link, useNavigate } from "react-router-dom";
const Signup = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    contactNumber: "",
    role: "tenant",
  });
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-center items-center  p-4">
      <div className="w-full max-w-lg p-8 space-y-6 bg-white rounded-2xl shadow-lg min-w-full md:min-w-[420px]">
        <div className="text-center mb-6">
          <h3 className="text-xl font-bold mb-2 text-blue-600">
            Welcome to RentEasy!
          </h3>
          <h3 className="text-3xl font-bold text-gray-900 mb-2">
            Create Your Account
          </h3>
          <p className=" text-slate-700 mb-6">
            Join us today by registering yourself Now!
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              className="border p-2 rounded-md border-gray-300 shadow-sm w-full text-sm "
            />
            <input
              type="text"
              name="email"
              placeholder="Enter your Email"
              value={formData.email}
              onChange={handleChange}
              className="border p-2 rounded-md border-gray-300 shadow-sm w-full text-sm  items-center"
            />
            <input
              type="text"
              name="contactNumber"
              placeholder="Enter your Phone Number"
              value={formData.contactNumber}
              onChange={handleChange}
              className="border p-2 rounded-md border-gray-300 shadow-sm w-full text-sm "
            />
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              className="border p-2 rounded-md border-gray-300 shadow-sm w-full text-sm "
            />
          </div>
          <div className="flex flex-row  items-center">
            <div className="mt-4">
              <Label className="mb-2 block">Who are you?</Label>
              <div className="flex flex-col gap-4">
                <RadioGroup
                  value={formData.role}
                  className="flex flex-row gap-6"
                  onValueChange={(value) =>
                    setFormData({ ...formData, role: value })
                  }
                >
                  <div className="flex items-center gap-3">
                    <RadioGroupItem value="tenant" id="r1" />
                    <Label htmlFor="r1">Tenant</Label>
                  </div>
                  <div className="flex items-center gap-3">
                    <RadioGroupItem value="landlord" id="r2" />
                    <Label htmlFor="r2">Landlord</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="w-full mt-6 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-gray-800 transition-colors text-sm"
          >
            Signup
          </button>
        </form>
        <div className="text-sm text-center mt-4!">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-blue-600 hover:underline"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
