import express from "express";
import {
  createPolicy,
  getPolicies,
  getPolicy,
  updatePolicy,
  deletePolicy,
} from "../controllers/policy.controller.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.post("/", upload.single("appliedDocument"), createPolicy);
router.get("/", getPolicies);
router.get("/:id", getPolicy);
router.put("/:id", upload.single("appliedDocument"), updatePolicy);
router.delete("/:id", deletePolicy);

export default router;
