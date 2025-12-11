import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import axiosClient from "@/utils/axiosClient";
import { USER_API_END_POINT } from "@/utils/constants";
const Signup = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [backendErrors, setBackendErrors] = useState([]);
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
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    setBackendErrors([]);
    try {
      const response = await axiosClient.post(
        `${USER_API_END_POINT}/register`,
        formData,
        {
          withCredentials: true,
        }
      );
      if (response.data.success) {
        navigate("/login");
      }
      console.log(response.data);
    } catch (messages) {
      setBackendErrors(messages);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10 bg-background">
      <div className="w-full max-w-lg p-8 space-y-6 bg-white rounded-2xl md:shadow-[0_0_25px_rgba(0,0,0,0.35)]">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-semibold text-primary mb-1">
            Welcome to RentEasy!
          </h3>
          <h3 className="text-3xl font-bold text-gray-900 mb-2">
            Create Your Account
          </h3>
          <p className=" text-sm text-muted-foreground">
            Join us today by registering yourself Now!
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              className="border p-2 rounded-md border-gray-300 shadow-sm w-full text-sm "
            />
            <Input
              type="email"
              name="email"
              placeholder="Enter your Email"
              value={formData.email}
              onChange={handleChange}
              className="border p-2 rounded-md border-gray-300 shadow-sm w-full text-sm  items-center"
            />
            <Input
              type="text"
              name="contactNumber"
              placeholder="Enter your Phone Number"
              value={formData.contactNumber}
              onChange={handleChange}
              className="border p-2 rounded-md border-gray-300 shadow-sm w-full text-sm "
            />
            <Input
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
              <div className="flex flex-col gap-6">
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
          {backendErrors.length > 0 && (
            <div className="mt-3 text-xs md:text-sm text-red-500 space-y-1">
              <ul className="list-disc list-inside">
                {backendErrors.map((err, idx) => (
                  <li key={idx}>{err}</li>
                ))}
              </ul>
            </div>
          )}

          {loading ? (
            <Button
              variant="outline"
              disabled
              size="sm"
              className="w-full mt-6 bg-primary text-white py-2 px-4 rounded-md"
            >
              <Spinner />
              Creating Account...
            </Button>
          ) : (
            <button
              type="submit"
              className="w-full mt-3 bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-dark transition-colors text-sm"
            >
              Signup
            </button>
          )}
        </form>
        <div className="text-sm text-center mt-4">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-primary hover:underline"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
