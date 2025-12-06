import mongoose from "mongoose";
const { Schema } = mongoose;

const roomInquirySchema = new Schema({
    room: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Room",
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },owner: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        required: true 
    },
    status: {
        type: String,
        enum: ["pending", "confirmed", "rejected", "cancelled"],
        default: "pending"
    },
    message: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

export default mongoose.model("RoomInquiry", roomInquirySchema);