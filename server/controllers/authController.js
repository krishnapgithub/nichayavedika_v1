import User from "../models/User.js";
import Otp from "../models/Otp.js";

export const registerUser = async (req, res) => {
    try {
        const { fullName, mobile, email, password, gender, registeringFor } = req.body;

        if (!fullName || !mobile || !password || !gender || !registeringFor) {
            return res.status(400).json({
                success: false,
                message: "Please fill all required fields",
            });
        }

        const existingUser = await User.findOne({ mobile });

        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "Mobile number already registered",
            });
        }

        const user = await User.create({
            fullName,
            mobile,
            email,
            password,
            gender,
            registeringFor,
        });

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: {
                id: user._id,
                fullName: user.fullName,
                mobile: user.mobile,
                email: user.email,
                gender: user.gender,
                registeringFor: user.registeringFor,
                isMobileVerified: user.isMobileVerified,
            },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const sendOtp = async (req, res) => {
    try {
        const { mobile } = req.body;

        if (!mobile) {
            return res.status(400).json({
                success: false,
                message: "Mobile number is required",
            });
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        await Otp.create({
            mobile,
            otp,
            expiresAt: new Date(Date.now() + 5 * 60 * 1000),
        });

        console.log("DEV OTP:", otp);

        res.json({
            success: true,
            message: "OTP sent successfully",
            devOtp: otp,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const verifyOtp = async (req, res) => {
    try {
        const { mobile, otp } = req.body;

        const otpRecord = await Otp.findOne({
            mobile,
            otp,
            isUsed: false,
            expiresAt: { $gt: new Date() },
        }).sort({ createdAt: -1 });

        if (!otpRecord) {
            return res.status(400).json({
                success: false,
                message: "Invalid or expired OTP",
            });
        }

        otpRecord.isUsed = true;
        await otpRecord.save();

        await User.findOneAndUpdate(
            { mobile },
            { isMobileVerified: true }
        );

        res.json({
            success: true,
            message: "OTP verified successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};