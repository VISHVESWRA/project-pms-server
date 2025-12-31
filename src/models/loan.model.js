import mongoose from "mongoose";

const loanSchema = new mongoose.Schema(
  {
    loanName: { type: String, required: true },
    loanType: { type: String },
    lender: { type: String },
    loanAmount: { type: Number, required: true },
    interestRate: Number,
    tenure: Number,
    emi: Number,
    startDate: String, // YYYY-MM-DD
    endDate: String,
    status: { type: String, default: "active" },
    notes: String,
  },
  { timestamps: true }
);

export default mongoose.model("Loan", loanSchema);
