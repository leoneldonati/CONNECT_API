import { getProducts } from "../controllers/product.controller.js";
import { Router } from "express";

const productRouter = Router();

productRouter.get("/products", getProducts);

export default productRouter;
