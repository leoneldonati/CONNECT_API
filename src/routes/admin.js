import { Router } from "express";
import { authAdmin } from "../controllers/admin.controller.js";

const adminRouter = Router();

adminRouter.post("/admin", authAdmin);

export default adminRouter;
