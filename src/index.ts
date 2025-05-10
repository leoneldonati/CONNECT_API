import express from "express";
import cors from "cors";
import { isProduction, port } from "@config";
import { checkAllowedOrigin } from "@helpers/origins";

const app = express();

app.use(express.json());
app.use(cors({ credentials: true, origin: checkAllowedOrigin }));

app.listen(port, () => !isProduction && console.log("LISTEN ON PORT:", port));
