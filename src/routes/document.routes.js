import express from "express";
import {
  uploadDocument,
  getAllDocuments,
  getDocumentById,
  updateDocument,
  deleteDocument,
  getStatistics,
} from "../controllers/document.controller.js";
import { upload } from "../config/multerConfig.js";

const router = express.Router();

router.post("/upload", upload.single("file"), uploadDocument);
router.get("/", getAllDocuments);
router.get("/statistics", getStatistics);
router.get("/:id", getDocumentById);
router.put("/:id", updateDocument);
router.delete("/:id", deleteDocument);

export default router;
