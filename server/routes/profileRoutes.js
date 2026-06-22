
import express from "express";
import {
    createProfile,
    getProfiles,
} from "../controllers/profileController.js";

const router = express.Router();

router.post("/create", createProfile);
router.get("/", getProfiles);

export default router;