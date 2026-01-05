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
      required: true,
      trim: true,
    },

    totalAmount: {
      type: Number,
      required: true,
      min: 1,
    },

    monthlyAmount: {
      type: Number,
      required: true,
      min: 1,
    },

    duration: {
      type: Number,
      required: true,
      min: 1,
    },

    paidMonths: {
      type: Number,
      default: 0,
      min: 0,
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

    lastPaidDate: {
      type: Date,
      default: null,
    },

    closedDate: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("Chit", chitSchema);
