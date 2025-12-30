import express from "express";
import {
  createPolicy,
  getPolicies,
  getPolicy,
  updatePolicy,
  deletePolicy,
} from "../controllers/policy.controller.js";

const router = express.Router();

router.post("/", createPolicy);
router.get("/", getPolicies);
router.get("/:id", getPolicy);
router.put("/:id", updatePolicy);
router.delete("/:id", deletePolicy);

export default router;
