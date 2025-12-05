import User from "../models/user.models.js";
import UserOtp from "../models/userotp.models.js"
import { ApiResponse } from "../utils/api-response.js";
import { ApiError } from "../utils/api-error.js";
import { asyncHandler } from "../utils/async-handler.js";
import { sendEmail, emailVerificationContent, forgotPasswordContent } from "../utils/mail.js";
import crypto from "crypto";
import jwt from "jsonwebtoken";

const generateAccessandRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating access token",
    );
  }
};

export const registerUser = asyncHandler(async (req, res) => {
  const { email, fullName, password, avatar, role, contactNumber } = req.body;

  if (!email || !fullName || !password || !role || !contactNumber) {
    throw new ApiError(400, "All fields are required");
  }

  const existedUser = await User.findOne({ email });

  if (existedUser) {
    throw new ApiError(409, "User already exists");
  }

  const user = await User.create({
    email,
    fullName,
    password,
    avatar,
    role,
    contactNumber,
    isEmailVerified: false,
  });

  const { unHashedToken, hashedToken, tokenExpiry } =
    user.generateTemporaryToken();

  user.emailVerificationToken = hashedToken;
  user.emailVerificationExpiry = tokenExpiry;

  await user.save();

  await sendEmail({
    email: user.email,
    subject: "Verify your Email",
    mailgenContent: emailVerificationContent(
      user.fullName,
      `${req.protocol}://${req.get("host")}/api/v1/auth/verify-email/${unHashedToken}`,
    ),
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken -forgotPasswordToken -forgotPasswordExpiry -emailVerificationToken -emailVerificationExpiry",
  );

  return res
    .status(201)
    .json(
      new ApiResponse(
        201,
        { user: createdUser },
        "User registered successfully",
      ),
    );
});

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, "All fields are required");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(401, "User not found");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid credentials");
  }
  const { accessToken, refreshToken } = await generateAccessandRefreshToken(
    user._id,
  );

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken -forgotPasswordToken -forgotPasswordExpiry -emailVerificationToken -emailVerificationExpiry",
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        { user: loggedInUser, accessToken, refreshToken },
        "User logged in successfully",
      ),
    );
});

export const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    { $set: { refreshToken: "" } },
    { new: true },
  );

  const options = {
    httpOnly: true,
    secure: true,
  };
  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged out successfully"));
});

export const getCurretUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select(
    "-password -refreshToken -forgotPasswordToken -forgotPasswordExpiry -emailVerificationToken -emailVerificationExpiry",
  );
  return res
    .status(200)
    .json(new ApiResponse(200, { user }, "Current user fetched successfully"));
});

export const verifyEmail = asyncHandler(async (req, res) => {
  const { token } = req.params;

  if (!token) {
    throw new ApiError(400, "Verification token is required");
  }
  const hashedToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  const user = await User.findOne({
    emailVerificationToken: hashedToken,
    emailVerificationExpiry: { $gt: Date.now() },
  });

  if (!user) {
    throw new ApiError(400, "Invalid or expired verification token");
  }
  user.isEmailVerified = true;
  user.emailVerificationToken = undefined;
  user.emailVerificationExpiry = undefined;
  await user.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Email verified successfully"));
});

export const resendEmailVerification = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user?._id);

  if (!user) {
    throw new ApiError(404, "User not found");
  }
  if (user.isEmailVerified) {
    throw new ApiError(400, "Email is already verified");
  }
  const { unHashedToken, hashedToken, tokenExpiry } =
  user.generateTemporaryToken();
  user.emailVerificationToken = hashedToken;
  user.emailVerificationExpiry = tokenExpiry;

  await user.save();

  await sendEmail({
    email: user.email,
    subject: "Verify your Email",
    mailgenContent: emailVerificationContent(
      user.fullName,
      `${req.protocol}://${req.get("host")}/api/v1/auth/verify-email?token=${unHashedToken}`,
    ),
  });
  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Verification email sent successfully"));
});

export const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken = req.body.refreshToken || req.cookies.refreshToken;

  if (!incomingRefreshToken) {
    throw new ApiError(400, "Refresh token is required");
  }

  try {
    const decodedToken=jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET,
    );
    const user = await User.findById(decodedToken?._id);

    if(!user){
      throw new ApiError(401, "Invalid refresh token");
    }
    if (user.refreshToken !== incomingRefreshToken) {
      throw new ApiError(401, "Refresh token mismatch");
    }

    const options = {
      httpOnly: true,
      secure: true,
    };
    const { accessToken, refreshToken: newRefreshToken } = await generateAccessandRefreshToken(user._id);
    user.refreshToken = newRefreshToken;
    await user.save({ validateBeforeSave: false });

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", newRefreshToken, options)
      .json(
        new ApiResponse(
          200,
          { accessToken, refreshToken: newRefreshToken },
          "Access token refreshed successfully",
        ),
      );
  } catch (error) {
    throw new ApiError(401, "Invalid or expired refresh token");
  }
});

export const forgotPassword=asyncHandler(async(req,res)=>{
  const {email}=req.body;
  if(!email){
    throw new ApiError(400,"Email is required");
  }
  const user=await User.findOne({email});
  const otp=Math.floor(100000 + Math.random() * 900000).toString();
  await UserOtp.deleteMany({ userId: user._id });
  await UserOtp.create({
    userId: user._id,
    otp
  });
   await sendEmail({
    email: user.email,
    subject: "Forgot Password OTP",
    mailgenContent: forgotPasswordContent(
      user.fullName,
      otp
    ),
  });
  return res.status(200).json(new ApiResponse(200, {}, "OTP sent to email successfully"));
});

export const verifyForgotPasswordOtp=asyncHandler(async(req,res)=>{
  const {email,otp}=req.body;
  if(!email || !otp ){
    throw new ApiError(400,"All fields are required");
  }
  const user=await User.findOne({email});
  const userOtp=await UserOtp.findOne({userId:user._id,otp});
  if(!userOtp){
    throw new ApiError(400,"Invalid OTP");
  }
  return res.status(200).json(new ApiResponse(200, {}, "OTP verified successfully"));
});

export const resetPassword=asyncHandler(async(req,res)=>{
  const {email,otp,newPassword}=req.body;
  if(!email || !otp || !newPassword){
    throw new ApiError(400,"All fields are required");
  }
  const user=await User.findOne({email});
  const userOtp=await UserOtp.findOne({userId:user._id,otp});
  if(!userOtp){
    throw new ApiError(400,"OTP expired or invalid");
  }
  user.password=newPassword;
  await user.save({ validateBeforeSave: false });
  await UserOtp.deleteMany({ userId: user._id });
  return res.status(200).json(new ApiResponse(200, {}, "Password reset successfully"));
});

export const changePassword=asyncHandler(async(req,res)=>{
  const {oldPassword,newPassword}=req.body;
  if(!oldPassword || !newPassword){
    throw new ApiError(400,"All fields are required");
  } 
  const user=await User.findById(req.user._id);
  const isPasswordValid=await user.isPasswordCorrect(oldPassword);
  if(!isPasswordValid){
    throw new ApiError(401,"Old password is incorrect");
  }
  user.password=newPassword;
  await user.save({ validateBeforeSave: false });
  return res.status(200).json(new ApiResponse(200, {}, "Password changed successfully"));
});

export const updateProfile=asyncHandler(async(req,res)=>{
  const {avatar,fullName,contactNumber}=req.body;
  const userId=req.params.id;
  const user=await User.findById(userId);
  if(!user){
    throw new ApiError(404,"User not found");
  }
  if(req.user._id.toString()!==userId){
    throw new ApiError(403,"Unauthorized to update this profile");
  }
  const updatedData={
    avatar:avatar?.trim() || user.avatar,
    fullName:fullName?.trim() || user.fullName,
    contactNumber:contactNumber?.trim() || user.contactNumber,
  }

  const updatedUser=await User.findByIdAndUpdate(userId,updatedData,{new:true,runValidators:true});
  res.status(200).json(new ApiResponse(200, { updatedUser }, "Profile updated successfully"));
});
