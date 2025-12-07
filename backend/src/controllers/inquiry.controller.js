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

export const removeContact=asyncHandler(async(req,res)=>{
    const userId=req.user._id;
    const {inquiryId}=req.body;
    const inquiry=await RoomInquiry.findById(inquiryId);

    if(!inquiry){
        throw new ApiError(404,"Inquiry not found");
    }
    if(inquiry.user.toString()!==userId.toString()){
        throw new ApiError(403,"You are not authorized to delete this inquiry");
    }
    await RoomInquiry.findByIdAndDelete(inquiryId);
    res.status(200).json(new ApiResponse(200,null,"Inquiry deleted successfully"));
});

export const getMyInquiriesLandlord=asyncHandler(async(req,res)=>{
    const userId=req.user._id;

    const inquiries=await RoomInquiry.find({owner:userId}).populate('user','fullName email contactNumber').populate('room', 'propertyName price');
    
    if(inquiries.length===0){
        throw new ApiError(404,"No inquiries found for this user");
    }

    res.status(200).json(new ApiResponse(200,{inquiries},"Inquiries fetched successfully"));
});

export const getMyInquiriesTenant=asyncHandler(async(req,res)=>{
    const userId=req.user._id;
    const inquiries=await RoomInquiry.find({user:userId}).populate('room', 'propertyName ');

    if(!inquiries){
        throw new ApiError(404,"You have no inquiries");
    }

    res.status(200).json(new ApiResponse(200,{inquiries},"Inquiries fetched successfully"));
});

export const updateInquiryStatus=asyncHandler(async(req,res)=>{
    const userId=req.user._id;
    const {inquiryId,status}=req.body;
    const inquiry=await RoomInquiry.findById(inquiryId);

    const validStatuses = ["pending", "confirmed", "rejected", "cancelled"];
    if (!validStatuses.includes(status)) {
        throw new ApiError(400, "Invalid status value");
    }

    if(!inquiry){
        throw new ApiError(404,"Inquiry not found");
    }
    if(inquiry.owner.toString()!==userId.toString()){
        throw new ApiError(403,"You are not authorized to update this inquiry");
    }
    const updatedInquiry=await RoomInquiry.findByIdAndUpdate(inquiryId, {$set:{status}}, {new:true});
    if (!updatedInquiry) {
        throw new ApiError(404, "Inquiry not found");
    }
     res.status(200).json(new ApiResponse(200, updatedInquiry, "Inquiry status updated successfully"));
});
