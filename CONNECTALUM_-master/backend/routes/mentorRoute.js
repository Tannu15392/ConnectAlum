import express from "express";

import {
  addMentor,
  getAllMentors
} from "../controllers/mentorController.js";

import authMiddleware, { requireRole } from "../middleware/auth.js";

const router = express.Router();

// Alumni only
router.post(
  "/add",
  authMiddleware,
  requireRole("alumni"),
  addMentor
);

// Public mentor listing
router.get("/", getAllMentors);

export default router;