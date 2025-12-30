import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import {
  createIncome,
  getIncomeList,
  updateIncome,
  deleteIncome,
} from "../controllers/income.controller.js";

const router = express.Router();

// router.use(authMiddleware); // 🔐 all routes protected
console.log("route page");

router.post("/test", (req, res) => {
  res.json({ message: "Income route working" });
});

router.post("/", createIncome);
router.get("/", getIncomeList);
router.put("/:id", updateIncome);
router.delete("/:id", deleteIncome);

export default router;
