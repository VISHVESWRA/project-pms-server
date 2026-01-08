import mongoose from "mongoose";

const documentSchema = new mongoose.Schema(
  {
    documentType: {
      type: String,
      required: true,
      enum: [
        "aadhar",
        "pan",
        "driving_license",
        "voter_id",
        "passport",
        "other",
      ],
    },
    documentNumber: {
      type: String,
      trim: true,
    },
    holderName: {
      type: String,
      required: true,
      trim: true,
    },
    originalName: {
      type: String,
      required: true,
    },
    cloudinaryUrl: {
      type: String,
      required: true,
    },
    cloudinaryPublicId: {
      type: String,
      required: true,
    },
    fileType: {
      type: String,
      required: true,
    },
    fileSize: {
      type: Number,
    },
    expiryDate: {
      type: Date,
    },
    notes: {
      type: String,
      trim: true,
    },
    uploadDate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster queries
documentSchema.index({ documentType: 1 });
documentSchema.index({ uploadDate: -1 });

const Document = mongoose.model("Document", documentSchema);

export default Document;
