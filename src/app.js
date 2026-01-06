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

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://your-frontend.onrender.com", // later
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

app.use("/api/income", incomeRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/policies", policyRoutes);
app.use("/api/loans", loanRoutes);
app.use("/api/chits", chitRoutes);

app.use("/uploads", express.static("uploads"));

app.use("/api/dashboard", dashboardRoutes);

app.get("/", (req, res) => {
  res.send("API running...");
});

export default app;
