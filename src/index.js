import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { isProduction, port } from "./config.js";
import { checkAllowedOrigin } from "./helpers/origins.js";
import adminRouter from "./routes/admin.js";
import { verifySession } from "./middlewares/auth.js";
import productRouter from "./routes/products.js";

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ credentials: true, origin: checkAllowedOrigin }));
app.use(cookieParser());

// app.use(verifySession);
// RUTAS
app.use(adminRouter);
app.use(productRouter);

app.listen(port, () => !isProduction && console.log("LISTEN ON PORT:", port));
