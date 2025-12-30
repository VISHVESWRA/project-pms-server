import mongoose from "mongoose";

const incomeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    sourceName: {
      type: String,
      required: true,
    },
    category: String,
    amount: {
      type: Number,
      required: true,
    },
    frequency: {
      type: String,
      enum: ["one-time", "monthly", "yearly"],
    },
    paymentMode: {
      type: String,
      enum: ["cash", "upi", "bank"],
    },
    type: {
      type: String,
      enum: ["active", "passive"],
    },
    date: Date,
    notes: String,
  },
  { timestamps: true }
);

const Income = mongoose.models.Income || mongoose.model("Income", incomeSchema);

export default Income;
