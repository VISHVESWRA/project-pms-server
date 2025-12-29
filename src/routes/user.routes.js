import express from "express";
import { createUser, getUsers } from "../controllers/user.controller.js";

const router = express.Router();

router.post("/", createUser);
router.get("/", getUsers);

// router.get("/profile", authMiddleware, (req, res) => {
//   res.json({ userId: req.userId });
// });

export default router;
