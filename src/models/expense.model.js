import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema(
  {
    // user: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "User",
    //   required: true,
    // },
    expenseName: { type: String, required: true },
    category: { type: String },
    amount: { type: Number, required: true },
    paymentMode: { type: String },
    type: { type: String },
    date: { type: Date, default: Date.now },
    notes: { type: String },
  },
  { timestamps: true }
);

const Expense = mongoose.model("Expense", expenseSchema);
export default Expense;
