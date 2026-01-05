import express from "express";
import {
  createChit,
  getChits,
  getChitById,
  updateChit,
  deleteChit,
  payChit,
} from "../controllers/chit.controller.js";

const router = express.Router();

router.post("/", createChit);
router.get("/", getChits);
router.get("/:id", getChitById);
router.put("/:id", updateChit);
router.delete("/:id", deleteChit);
router.post("/chits/:id/pay", payChit);

export default router;
