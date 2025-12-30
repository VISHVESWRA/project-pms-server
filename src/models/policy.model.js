import mongoose from "mongoose";

const policySchema = new mongoose.Schema(
  {
    policyName: { type: String, required: true },
    policyType: { type: String },
    provider: { type: String },
    policyNumber: { type: String },
    premiumAmount: { type: Number, required: true },
    frequency: { type: String },
    status: { type: String, default: "active" },
    startDate: { type: Date },
    endDate: { type: Date },
    nominee: { type: String },
    notes: { type: String },
  },
  { timestamps: true }
);

const Policy = mongoose.model("Policy", policySchema);
export default Policy;
