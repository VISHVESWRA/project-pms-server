import express from "express";
import {
  createLoan,
  getLoans,
  updateLoan,
  deleteLoan,
  getLoanById,
} from "../controllers/loan.controller.js";

const router = express.Router();

router.post("/", createLoan);
router.get("/", getLoans);
router.get("/:id", getLoanById);
router.put("/:id", updateLoan);
router.delete("/:id", deleteLoan);

export default router;
