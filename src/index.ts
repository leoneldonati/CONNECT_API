import express from "express";
import cors from "cors";
import morgan from "morgan";
import { isProduction, port } from "@config";
import { checkAllowedOrigin } from "@helpers/origins";
import { adminRouter } from "@routes/admin";

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ credentials: true, origin: checkAllowedOrigin }));

// RUTAS
app.use(adminRouter);

app.listen(port, () => !isProduction && console.log("LISTEN ON PORT:", port));
