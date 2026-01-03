// const loanSchema = new mongoose.Schema(
//   {
//     loanName: { type: String, required: true },
//     loanType: { type: String },
//     lender: { type: String },
//     loanAmount: { type: Number, required: true },
//     interestRate: Number,
//     tenure: Number,
//     emi: Number,
//     startDate: String, // YYYY-MM-DD
//     endDate: String,
//     status: { type: String, default: "active" },
//     notes: String,
//   },
//   { timestamps: true }
// );

// export default mongoose.model("Loan", loanSchema);

import mongoose from "mongoose";

const loanSchema = new mongoose.Schema(
  {
    loanName: { type: String, required: true },
    loanType: String,
    lender: String,

    loanAmount: { type: Number, required: true },
    interestRate: Number,

    tenure: { type: Number, required: true }, // months
    emiAmount: { type: Number, required: true },

    paidEmis: { type: Number, default: 0 },

    startDate: Date,
    endDate: Date,

    status: {
      type: String,
      enum: ["upcoming", "active", "closed"],
      default: "active",
    },

    notes: String,
  },
  { timestamps: true }
);

export default mongoose.model("Loan", loanSchema);
