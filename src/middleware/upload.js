import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";
import cloudinary from "../config/cloudinary.js";

// const storage = new CloudinaryStorage({
//   cloudinary,
//   params: async (req, file) => {
//     const isPdf = file.mimetype === "application/pdf";

//     return {
//       folder: "policies",
//       resource_type: isPdf ? "raw" : "image",
//       public_id: file.originalname.split(".")[0],
//     };
//   },
// });

// In your multer config
const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    const isPdf = file.mimetype === "application/pdf";

    return {
      folder: "policies",
      resource_type: isPdf ? "raw" : "image",
      public_id: file.originalname.split(".")[0],
      // Add this for PDFs to enable inline viewing
      flags: isPdf ? "attachment:false" : undefined,
    };
  },
});

export default multer({ storage });
