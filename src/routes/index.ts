import { Router } from "express";

import authRouter from "../modules/auth/auth.route";
import roleRouter from "../modules/role/role.route";
const router = Router();


router.use("/auth", authRouter);
router.use("/roles", roleRouter);
export default router;