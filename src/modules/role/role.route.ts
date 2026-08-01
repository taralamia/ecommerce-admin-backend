
import { Router } from "express";
import { roleController } from "./role.controller";
import { authMiddleware } from "../../common/middlewares/auth.middleware";
import { permissionMiddleware } from "../../common/middlewares/permission.middleware";
const router = Router();

router.post(
  "/",
  authMiddleware,
  permissionMiddleware("role:create"),
  roleController.createRole
);

router.get(
  "/",
  authMiddleware,
  permissionMiddleware("role:read"),
  roleController.getRoles
);
export default router;