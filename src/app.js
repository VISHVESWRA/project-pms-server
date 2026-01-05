import express from "express";
import cors from "cors";
import userRoutes from "./routes/user.routes.js";
import authRoutes from "./routes/auth.routes.js";
import incomeRoutes from "./routes/income.routes.js";
import expenseRoutes from "./routes/expense.routes.js";
import policyRoutes from "./routes/policy.routes.js";
import loanRoutes from "./routes/loan.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";
import chitRoutes from "./routes/chit.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

console.log("🔥 app.js loaded");

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

app.use("/api/income", incomeRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/policies", policyRoutes);
app.use("/api/loans", loanRoutes);
app.use("/api/chits", chitRoutes);

app.use("/api/dashboard", dashboardRoutes);

app.get("/", (req, res) => {
  res.send("API running...");
});

export default app;
