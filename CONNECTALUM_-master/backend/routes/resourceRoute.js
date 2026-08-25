import express from "express";

import {
  createResource,
  getResources,
  toggleLike,
  deleteResource
} from "../controllers/resourceController.js";

import authMiddleware, { requireRole } from "../middleware/auth.js";

const router = express.Router();

// Public
router.get("/", getResources);

// Alumni only
router.post(
  "/create",
  authMiddleware,
  requireRole("alumni"),
  createResource
);

// Authenticated users
router.post("/:id/like", authMiddleware, toggleLike);

// Authenticated users
router.delete("/:id", authMiddleware, deleteResource);

export default router;