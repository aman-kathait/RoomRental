import mongoose from "mongoose";
const { Schema } = mongoose;
const roomSchema=new Schema({
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    propertyName:{  
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    address:{
        addressLine1:{
            type:String,
            required:true
        },
        city:{
            type:String,
            required:true
        },
        state:{
            type:String,
            required:true
        },
        landmark:{
            type:String,
            required:true
        },
        pincode:{
            type:String,
            required:true
        },
    },
    images:[
        {
        url:{ type: String,required:true }
        }
    ],
    amenities: [
        { type: String } 
    ],
    isAvailable: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
},{ timestamps: true });

export default mongoose.model("Room",roomSchema);