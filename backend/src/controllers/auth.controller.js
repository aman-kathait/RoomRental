import User from "../models/user.models.js";
import {ApiResponse} from "../utils/api-response.js";
import jwt from "jsonwebtoken";
import {ApiError} from "../utils/api-error.js";
import {emailVerificationContent, sendEmail} from "../utils/mail.js";

const generateAccessandRefreshToken=async(userId)=>{
    try{
        const user=await User.findById(userId);
        const accessToken=user.generateAccessToken();
        const refreshToken=user.generateRefreshToken();
        user.refreshToken=refreshToken;
        await user.save({validateBeforeSave:false});
        return {accessToken,refreshToken};
    }catch (error) {
        throw new ApiError(500,"Something went wrong while generating access token",);
    }
}

const registerUser=async(req,res)=>{
    const {email,fullName,password,avatar,role,contactNumber}=req.body;
    if(!email || !fullName || !password || !role || !contactNumber){
        return new ApiError(401,"All fields are required",[]);
    }
    const existedUser=await User.findOne({email});
    if (existedUser) {
        return new ApiError(409,"User already exists",[]);
    }
    const user=await User.create({
        email,
        fullName,
        password,
        avatar,
        role,
        contactNumber,
        isEmailVerified:false
    });
    const {unHashedToken,hashedToken,tokenExpiry}=user.generateTemporaryToken();
    user.emailVerificationToken=hashedToken;
    user.emailVerificationExpiry=tokenExpiry;

    await user.save({validateBeforeSave:false});

    await sendEmail({
        email:user?.email,
        subject:"Verify your email",
        mailgenContent:emailVerificationContent(
            user.fullName,
            `${req.protocol}://${req.get("host")}/api/v1/auth/verify-email?token=${unHashedToken}`
        )
    });

    const createdUser=await User.findById(user._id).select("-password -refreshToken -forgotPasswordToken -forgotPasswordExpiry -emailVerificationToken -emailVerificationExpiry");

    if (!createdUser) {
        throw new ApiError(500,"Something went wrong while creating user",);
    }

    return res.status(201).json(new ApiResponse(201,{user:createdUser},"User registered successfully"));
}

export {registerUser};