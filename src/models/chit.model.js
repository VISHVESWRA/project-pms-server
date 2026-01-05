import mongoose from "mongoose";

const chitSchema = new mongoose.Schema(
  {
    chitName: {
      type: String,
      required: true,
      trim: true,
    },

    groupName: {
      type: String,
      trim: true,
    },

    totalAmount: {
      type: Number,
      required: true,
    },

    monthlyAmount: {
      type: Number,
      required: true,
    },

    duration: {
      type: Number,
      required: true,
    },

    paidMonths: {
      type: Number,
      default: 0,
    },

    startDate: {
      type: Date,
      required: true,
    },

    status: {
      type: String,
      enum: ["upcoming", "active", "closed"],
      default: "upcoming",
    },

    lastPaidDate: Date,
    closedDate: Date,
  },
  { timestamps: true }
);

export default mongoose.model("Chit", chitSchema);
