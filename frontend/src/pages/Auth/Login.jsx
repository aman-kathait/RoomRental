import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Link, useNavigate } from "react-router-dom";
import axiosClient from "@/utils/axiosClient";
import { USER_API_END_POINT } from "@/utils/constants";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [backendErrors, setBackendErrors] = useState([]);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
        `${USER_API_END_POINT}/login`,
        formData,
        { withCredentials: true }
      );
      if (response.data.success) {
        navigate("/");
        console.log(response.data);
      }
    } catch (messages) {
      setBackendErrors(messages);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-background flex flex-col justify-center items-center">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl md:shadow-[0_0_25px_rgba(0,0,0,0.35)] sm:max-w-[400px]">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold mb-3 text-primary">
            <span className="text-black">Welcome to</span> RentEasy!
          </h3>
          <p className=" text-slate-700 mb-6">
            Please enter your credentials to access your account.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="border p-2 rounded-md border-gray-300 shadow-sm w-full text-sm  items-center mb-4 mt-1"
            />
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              className="border p-2 rounded-md border-gray-300 shadow-sm w-full text-sm  items-center mt-1"
            />
            {backendErrors.length > 0 && (
              <div className="mt-3 text-sm text-red-500 space-y-1">
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
                Please wait
              </Button>
            ) : (
              <button
                type="submit"
                className="w-full mt-6 bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-dark transition-colors text-sm"
              >
                Login
              </button>
            )}
          </div>
        </form>
        <div className="text-sm text-center mt-4">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-medium text-blue-600 hover:underline"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
