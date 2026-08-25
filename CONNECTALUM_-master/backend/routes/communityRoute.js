import express from "express";

import {
  createCommunity,
  getCommunities,
  toggleMembership,
  addPost,
  getCommunityById,
  likePost
} from "../controllers/communityController.js";

import authMiddleware, { requireRole } from "../middleware/auth.js";

const router = express.Router();

// Public
router.get("/", getCommunities);

// Alumni only
router.post(
  "/create",
  authMiddleware,
  requireRole("alumni"),
  createCommunity
);

// Authenticated users
router.get("/:id", authMiddleware, getCommunityById);

router.post("/:id/join", authMiddleware, toggleMembership);

router.post("/:id/post", authMiddleware, addPost);

router.post(
  "/:id/posts/:postId/like",
  authMiddleware,
  likePost
);

export default router;