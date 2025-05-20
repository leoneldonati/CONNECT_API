import {
  deleteProduct,
  getProducts,
  uploadProduct,
} from "../controllers/product.controller.js";
import { Router } from "express";

const productRouter = Router();

productRouter.get("/products", getProducts);
productRouter.post("/products", uploadProduct);
productRouter.delete("/products", deleteProduct);
export default productRouter;
