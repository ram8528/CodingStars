import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    password: { 
        type: String, 
        required: true 
    },
    verifyOtp: { 
        type: String, 
        default: ''
    },
    verifyOtpExpiresAt: { 
        type: Number, 
        default: 0
    },
    isAccountVerified: { 
        type: Boolean, 
        default: false
    },
    resetOtp: { 
        type: String, 
        default: ''
    },
    resetOtpExpireAt: { 
        type: Number, 
        default: 0
    },
    tasks: [{  // Changed from ObjectId to array of ObjectId to allow multiple tasks
        type: mongoose.Schema.Types.ObjectId,
        ref: "TaskModel", // Reference to TaskModel
    }],
},{ timestamps: true });

const userModel = mongoose.models.user || mongoose.model('user', userSchema);
export default userModel;
