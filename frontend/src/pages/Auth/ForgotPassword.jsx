import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "react-toastify";
import axiosClient from "@/utils/axiosClient";
import { useNavigate } from "react-router-dom";
const ForgotPassword = () => {
    const navigate = useNavigate();
  const [step, setStep] = useState(1); 
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const sendOtpHandler = async () => {
    try {
      setLoading(true);
      const res = await axiosClient.post("/api/v1/auth/forgot-password", { email });
      toast.success(res.data.message);
      setStep(2);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const verifyOtpHandler = async () => {
    try {
      setLoading(true);
      const res = await axiosClient.post(
        "/api/v1/auth/verify-otp",
        { email, otp }
      );
      toast.success(res.data.message);
      setStep(3);
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  const resetPasswordHandler = async () => {
    try {
      setLoading(true);
      const res = await axiosClient.post("/api/v1/auth/reset-password", {
        email,
        otp,
        newPassword,
      });
      if (res.status === 200){
        toast.success("Password reset successfull. Please login with your new password.");
        navigate("/login");
      }
      setStep(1);
      setEmail("");
      setOtp("");
      setNewPassword("");
    } catch (err) {
      toast.error(err.response?.data?.message || "Reset failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-32 max-w-md mx-auto bg-white p-6 rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Forgot Password
      </h2>

      {step === 1 && (
        <>
          <Input
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button
            className="w-full mt-4"
            onClick={sendOtpHandler}
            disabled={loading}
          >
            {loading ? "Sending..." : "Send OTP"}
          </Button>
        </>
      )}

      {step === 2 && (
        <>
          <Input
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <Button
            className="w-full mt-4"
            onClick={verifyOtpHandler}
            disabled={loading}
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </Button>
        </>
      )}

      {step === 3 && (
        <>
          <Input
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <Button
            className="w-full mt-4"
            onClick={resetPasswordHandler}
            disabled={loading}
          >
            {loading ? "Resetting..." : "Reset Password"}
          </Button>
        </>
      )}
    </div>
  );
};

export default ForgotPassword;
