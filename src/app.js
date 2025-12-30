import express from "express";
import cors from "cors";
import userRoutes from "./routes/user.routes.js";
import authRoutes from "./routes/auth.routes.js";
import incomeRoutes from "./routes/income.routes.js";
import expenseRoutes from "./routes/expense.routes.js";
import policyRoutes from "./routes/policy.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

console.log("🔥 app.js loaded");

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

app.use("/api/income", incomeRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/policies", policyRoutes);

app.get("/", (req, res) => {
  res.send("API running...");
});

export default app;
