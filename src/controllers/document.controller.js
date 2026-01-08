import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";
import Document from "../models/document.model.js";

// Helper function to upload to cloudinary
const uploadToCloudinary = (buffer, folder) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: folder,
        resource_type: "auto",
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );

    streamifier.createReadStream(buffer).pipe(uploadStream);
  });
};

// Upload document
export const uploadDocument = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const { documentType, documentNumber, holderName, expiryDate, notes } =
      req.body;

    if (!documentType || !holderName) {
      return res
        .status(400)
        .json({ error: "Document type and holder name are required" });
    }

    // Upload to Cloudinary
    const folder = `pms_documents/${documentType}`;
    const result = await uploadToCloudinary(req.file.buffer, folder);

    // Create document in database
    const document = new Document({
      documentType,
      documentNumber: documentNumber || "",
      holderName,
      originalName: req.file.originalname,
      cloudinaryUrl: result.secure_url,
      cloudinaryPublicId: result.public_id,
      fileType: req.file.mimetype,
      fileSize: req.file.size,
      expiryDate: expiryDate || null,
      notes: notes || "",
    });

    await document.save();

    res.status(201).json({
      success: true,
      message: "Document uploaded successfully",
      data: document,
    });
  } catch (error) {
    next(error);
  }
};

// Get all documents
export const getAllDocuments = async (req, res, next) => {
  try {
    const { documentType, search, page = 1, limit = 20 } = req.query;

    let query = {};

    // Filter by document type
    if (documentType && documentType !== "all") {
      query.documentType = documentType;
    }

    // Search by name or document number
    if (search) {
      query.$or = [
        { holderName: { $regex: search, $options: "i" } },
        { documentNumber: { $regex: search, $options: "i" } },
        { originalName: { $regex: search, $options: "i" } },
      ];
    }

    const documents = await Document.find(query)
      .sort({ uploadDate: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await Document.countDocuments(query);

    res.json({
      success: true,
      data: documents,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      totalDocuments: count,
    });
  } catch (error) {
    next(error);
  }
};

// Get single document
export const getDocumentById = async (req, res, next) => {
  try {
    const document = await Document.findById(req.params.id);

    if (!document) {
      return res.status(404).json({ error: "Document not found" });
    }

    res.json({
      success: true,
      data: document,
    });
  } catch (error) {
    next(error);
  }
};

// Update document
export const updateDocument = async (req, res, next) => {
  try {
    const { documentNumber, holderName, expiryDate, notes } = req.body;

    const document = await Document.findById(req.params.id);

    if (!document) {
      return res.status(404).json({ error: "Document not found" });
    }

    // Update fields
    if (documentNumber !== undefined) document.documentNumber = documentNumber;
    if (holderName) document.holderName = holderName;
    if (expiryDate !== undefined) document.expiryDate = expiryDate;
    if (notes !== undefined) document.notes = notes;

    await document.save();

    res.json({
      success: true,
      message: "Document updated successfully",
      data: document,
    });
  } catch (error) {
    next(error);
  }
};

// Delete document
export const deleteDocument = async (req, res, next) => {
  try {
    const document = await Document.findById(req.params.id);

    if (!document) {
      return res.status(404).json({ error: "Document not found" });
    }

    // Delete from Cloudinary
    await cloudinary.uploader.destroy(document.cloudinaryPublicId);

    // Delete from database
    await Document.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Document deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

// Get statistics
export const getStatistics = async (req, res, next) => {
  try {
    const totalDocuments = await Document.countDocuments();

    const typeStats = await Document.aggregate([
      {
        $group: {
          _id: "$documentType",
          count: { $sum: 1 },
        },
      },
    ]);

    const expiringDocs = await Document.find({
      expiryDate: {
        $gte: new Date(),
        $lte: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // Next 90 days
      },
    }).sort({ expiryDate: 1 });

    res.json({
      success: true,
      data: {
        totalDocuments,
        typeStats,
        expiringDocs,
      },
    });
  } catch (error) {
    next(error);
  }
};
