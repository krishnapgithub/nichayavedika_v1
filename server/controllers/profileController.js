
import Profile from "../models/Profile.js";

export const createProfile = async (req, res) => {
    try {
        const profile = await Profile.create(req.body);

        res.status(201).json({
            success: true,
            message: "Profile created successfully",
            profile,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const getProfiles = async (req, res) => {
    try {
        const profiles = await Profile.find().populate("user", "fullName mobile email gender");

        res.json({
            success: true,
            count: profiles.length,
            profiles,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};