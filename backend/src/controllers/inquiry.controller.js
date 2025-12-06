import { ApiResponse } from "../utils/api-response.js";
import { ApiError } from "../utils/api-error.js";
import { asyncHandler } from "../utils/async-handler.js";
import RoomInquiry from "../models/roominquiry.models.js";
import User from "../models/user.models.js";
import Room from "../models/room.models.js";

export const contact=asyncHandler(async(req,res)=>{
    const userId=req.user._id;
    const user=await User.findById(userId);

    if(!user){
        throw new ApiError(404,"User not found");
    }
    const {roomId,message}=req.body;
    const room=await Room.findById(roomId);

    if(!room){
        throw new ApiError(404,"Room not found");
    }

    const inquiry = await RoomInquiry.create({
      room: roomId,
      user: userId,
      owner: room.owner,
      message,
    });
    res.status(201).json(new ApiResponse(201,{inquiry},"Inquiry sent successfully"));
});

export const removeContact=asyncHandler(async(req,res)=>{});

export const getMyInquiriesLandlord=asyncHandler(async(req,res)=>{
    const userId=req.user._id;

    const inquiries=await RoomInquiry.find({owner:userId}).populate('user','fullName email contactNumber').populate('room', 'propertyName price');
    
    if(inquiries.length===0){
        throw new ApiError(404,"No inquiries found for this user");
    }

    res.status(200).json(new ApiResponse(200,{inquiries},"Inquiries fetched successfully"));
});

export const getMyInquiriesTenant=asyncHandler(async(req,res)=>{});
