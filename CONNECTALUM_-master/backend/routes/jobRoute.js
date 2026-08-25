import express from "express";

import {
  createJob,
  getJobs,
  getMyJobs,
  deleteJob,
  applyToJob,
  getMyApplications,
  getApplicationsForJob,
  getApplicationStatus
} from "../controllers/jobController.js";

import authMiddleware, { requireRole } from "../middleware/auth.js";

const router = express.Router();

// Public
router.get("/", getJobs);

// Alumni only
router.post(
  "/create",
  authMiddleware,
  requireRole("alumni"),
  createJob
);

// Authenticated users
router.get("/myjobs", authMiddleware, getMyJobs);

router.delete("/:id", authMiddleware, deleteJob);

router.post("/apply", authMiddleware, applyToJob);

router.get(
  "/my-applications",
  authMiddleware,
  getMyApplications
);

router.get(
  "/:jobId/applications",
  authMiddleware,
  getApplicationsForJob
);

router.get(
  "/:jobId/apply-status",
  authMiddleware,
  getApplicationStatus
);

export default router;