import express from "express";

import {
  getEvents,
  getEventById,
  createEvent,
  registerForEvent
} from "../controllers/eventController.js";

import authMiddleware, { requireRole } from "../middleware/auth.js";

const router = express.Router();

// Public
router.get("/", getEvents);

router.get("/:id", getEventById);

// Alumni only
router.post(
  "/create",
  authMiddleware,
  requireRole("alumni"),
  createEvent
);

// Authenticated users
router.post(
  "/register",
  authMiddleware,
  registerForEvent
);

export default router;