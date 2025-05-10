import { Router } from "express";
import { authAdmin } from "@controllers/admin.controller";

const adminRouter = Router();

adminRouter.post("/admin", authAdmin);

export { adminRouter };
