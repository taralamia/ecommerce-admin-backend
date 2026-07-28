import { Router } from "express";
import AppError from "../errors/AppError";

const router = Router();

router.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is running.",
    timestamp: new Date().toISOString(),
  });
});
router.get("/error", (req, res) => {
    throw new AppError(400, "Testing Global Error Handler");
});

export default router;