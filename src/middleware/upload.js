import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "policies",
    allowed_formats: ["pdf", "jpg", "jpeg", "png"],
    resource_type: "auto", // VERY IMPORTANT for PDF
  },
});

const upload = multer({ storage });

export default upload;
