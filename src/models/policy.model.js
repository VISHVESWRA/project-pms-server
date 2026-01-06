import mongoose from "mongoose";

const policySchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

    policyName: String,
    policyType: String,
    provider: String,
    policyNumber: String,
    premiumAmount: Number,
    frequency: String,
    startDate: Date,
    endDate: Date,
    nominee: String,
    notes: String,

    appliedDocument: {
      type: String, // file path
    },

    // derived status
    status: {
      type: String,
      enum: ["active", "expired", "upcoming"],
      default: "active",
    },
  },
  { timestamps: true }
);

const Policy = mongoose.model("Policy", policySchema);
export default Policy;
