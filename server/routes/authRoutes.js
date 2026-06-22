import express from "express";
import {
    registerUser,
    sendOtp,
    verifyOtp,
} from "../controllers/authController.js";


const router = express.Router();

router.post("/register", registerUser);
router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);


export default router;