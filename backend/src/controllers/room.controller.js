import { ApiResponse } from "../utils/api-response.js"
import { ApiError } from "../utils/api-error.js"
import { asyncHandler } from "../utils/async-handler.js"
import Room from "../models/room.models.js"
import User from "../models/user.models.js"


export const addRoom=asyncHandler(async(req,res)=>{
    const {propertyName,description,price,address,images,amenities}=req.body;

     if (!propertyName || !description || !price || !address) {
        throw new ApiError(400, "Missing required fields");
    }

    if (!address.city || !address.pincode) {
        throw new ApiError(400, "City and pincode are required in the address");
    }

    if (!images || !Array.isArray(images) || images.length === 0) {
        throw new ApiError(400, "At least one image is required");
    }

    const ownerId = req.user?._id;
    
    if(!ownerId){
        throw new ApiError(404,"Owner user not found");
    }
    const room=await Room.create({
        owner: ownerId,
        propertyName,
        description,
        price,
        address,
        images,
        amenities
    });

    res.status(201).json(new ApiResponse(201,{room},"Room added successfully"));
});