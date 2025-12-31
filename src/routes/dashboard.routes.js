import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import Income from "../models/income.model.js";
import Expense from "../models/expense.model.js";
import mongoose from "mongoose";

export const getIncomeExpenseSummary = async (req, res) => {
  try {
    // Income → user based
    const incomeResult = await Income.aggregate([
      {
        $match: {
          user: new mongoose.Types.ObjectId(req.user.id),
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$amount" },
        },
      },
    ]);

    // Expense → no user (FOR NOW)
    const expenseResult = await Expense.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: "$amount" },
        },
      },
    ]);

    const totalIncome = incomeResult[0]?.total || 0;
    const totalExpense = expenseResult[0]?.total || 0;

    res.json({
      income: totalIncome,
      expense: totalExpense,
      balance: totalIncome - totalExpense,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const router = express.Router();
router.use(authMiddleware); // 🔐 all routes protected

router.get("/total", getIncomeExpenseSummary);

export default router;
