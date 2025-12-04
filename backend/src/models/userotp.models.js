import mongoose from "mongoose"
const { Schema } = mongoose;

const userOtpSchema=new Schema({
    otp:{
        type:String,
        required:true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 900  //15 minutes
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

});

export default mongoose.model("UserOtp",userOtpSchema);