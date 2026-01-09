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
import documentRoutes from "./routes/document.routes.js";
import path from "path";
import { fileURLToPath } from "url";
import { errorHandler } from "./middleware/errorHandler.middleware.js";

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://project-pms.netlify.app",
      "https://project-pms-dbserver.onrender.com",
    ],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["GET", "POST", "PUT", "DELETE"],
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

// app.use("/uploads", express.static("uploads"));
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/documents", documentRoutes);

app.use("/api/dashboard", dashboardRoutes);

// Error handling
app.use(errorHandler);

app.get("/", (req, res) => {
  res.send("API running...");
});

export default app;
