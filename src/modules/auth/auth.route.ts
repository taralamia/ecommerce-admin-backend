import { Router } from "express";
import { authController } from "./auth.controller";
import { authMiddleware } from "../../common/middlewares/auth.middleware";
const router = Router();

router.post("/login", authController.login);
router.get(
  "/me",
  authMiddleware,
  authController.getCurrentUser
);
router.post(
  "/refresh",
  authController.refresh
);

router.post(
  "/logout",
  authMiddleware,
  authController.logout
);
export default router;