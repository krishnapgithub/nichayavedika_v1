import mongoose from "mongoose";

const otpSchema = new mongoose.Schema(
    {
        mobile: {
            type: String,
            required: true,
        },

        otp: {
            type: String,
            required: true,
        },

        expiresAt: {
            type: Date,
            required: true,
        },

        isUsed: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

const Otp = mongoose.model("Otp", otpSchema);

export default Otp;