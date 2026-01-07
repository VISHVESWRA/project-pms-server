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

router.post("/", upload.single("document"), createPolicy);
router.put("/:id", upload.single("document"), updatePolicy);
router.get("/", getPolicies);
router.get("/:id", getPolicy);
router.delete("/:id", deletePolicy);

export default router;
