import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";
import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    const isPdf = file.mimetype === "application/pdf";

    return {
      folder: "policies",
      resource_type: isPdf ? "raw" : "image",
      public_id: file.originalname.split(".")[0],
    };
  },
});

export default multer({ storage });
