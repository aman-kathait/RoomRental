import { ApiResponse } from "../utils/api-response.js";
import { ApiError } from "../utils/api-error.js";
import { asyncHandler } from "../utils/async-handler.js";
import Room from "../models/room.models.js";
import User from "../models/user.models.js";

export const addRoom = asyncHandler(async (req, res) => {
  const { propertyName, description, price, address, images, amenities } =
    req.body;

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

  if (!ownerId) {
    throw new ApiError(404, "Owner user not found");
  }
  const room = await Room.create({
    owner: ownerId,
    propertyName,
    description,
    price,
    address,
    images,
    amenities,
  });

  res
    .status(201)
    .json(new ApiResponse(201, { room }, "Room added successfully"));
});

export const getAllRooms = asyncHandler(
  asyncHandler(async (req, res) => {
    const rooms = await Room.find().populate(
      "owner",
      "name email fullName contactNumber",
    );
    if (!rooms || rooms.length === 0) {
      throw new ApiError(404, "No rooms found");
    }
    res
      .status(200)
      .json(new ApiResponse(200, { rooms }, "Rooms fetched successfully"));
  }),
);

export const getMyRooms = asyncHandler(async (req, res) => {
  const ownerId = req.user?._id;
  const myrooms = await Room.find({ owner: ownerId });
  if (!myrooms || myrooms.length === 0) {
    throw new ApiError(404, "No rooms found for this owner");
  }
  res
    .status(200)
    .json(new ApiResponse(200, { myrooms }, "My Rooms Fetched successfully"));
});

export const findRoomById = asyncHandler(async (req, res) => {
  const roomId = req.params.id;
  const room = await Room.findById(roomId).populate(
    "owner",
    "name email fullName contactNumber",
  );
  if (!room) {
    throw new ApiError(404, "Room not found");
  }
  res
    .status(200)
    .json(new ApiResponse(200, { room }, "Room Fetched successfully"));
});

export const editRoomDetails = asyncHandler(async (req, res) => {
  const roomId = req.params.id;
  const room = await Room.findById(roomId);

  if (!room) {
    throw new ApiError(404, "No Room find");
  }

  if (room.owner.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "Not authorized to edit this room");
  }

  const { propertyName, description, price, address, amenities } = req.body;

  const updatedData = {
    propertyName: propertyName?.trim() || room.propertyName,
    description: description?.trim() || room.description,
    price: price ?? room.price,
    amenities: amenities || room.amenities,
    address: {
      addressLine1: address?.addressLine1?.trim() || room.address.addressLine1,
      city: address?.city?.trim() || room.address.city,
      state: address?.state?.trim() || room.address.state,
      country: address?.country?.trim() || room.address.country,
      pincode: address?.pincode || room.address.pincode,
      landmark: address?.landmark?.trim() || room.address.landmark,
  }};
  const updatedRoom=await Room.findByIdAndUpdate(roomId,updatedData,{new:true,runValidators:true});
  if (!updatedRoom) throw new ApiError(500, "Failed to update room");

  res.status(200)
    .json(new ApiResponse(200,{updatedRoom},"Room Updated Successfully"));
});

export const deleteRoomById = asyncHandler(async (req, res) => {
  const roomId=req.params.id;
  const room=await Room.findById(roomId);
  if(!room){
    throw new ApiError(404,"Room not found");
  }

  if (room.owner.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "Not authorized to delete this room");
  }
  await Room.findByIdAndDelete(roomId);

 res.status(200)
    .json(new ApiResponse(200,{},"Room Deleted Successfully"));

});

export const updateRoomStatus = asyncHandler(async (req, res) => {
  const roomId = req.params.id;
  const { isAvailable } = req.body;

  const room = await Room.findById(roomId);
  if (!room) {
    throw new ApiError(404, "Room not found");
  }
  if (room.owner.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "Not authorized to update this room");
  }
  room.isAvailable = isAvailable;
  await room.save();
  res
    .status(200)
    .json(new ApiResponse(200, { room }, "Room status updated successfully"));
});

export const editRoomImages = asyncHandler(async (req, res) => {});