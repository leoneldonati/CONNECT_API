import { verifyToken } from "@libs/jsonwebtoken.js";
import type { RequestWithPayload } from "@definitions.js";
import type { Response, NextFunction } from "express";
import { ADMIN_COOKIE } from "@config.js";

const UNPROTECTED_ROUTES = ["/admin"];
const verifySession = (
  req: RequestWithPayload,
  res: Response,
  next: NextFunction
) => {
  const path = req.url;
  if (UNPROTECTED_ROUTES.includes(path)) {
    next();
    return;
  }

  const cookies = req.cookies;

  const adminSession = cookies["admin-session"];

  if (!adminSession) {
    res
      .cookie(ADMIN_COOKIE, "", { maxAge: 0 })
      .status(401)
      .json({ message: "Solo el administrador tiene acceso." });
    return;
  }

  const checkedPayload = verifyToken(adminSession);
  if (!checkedPayload) {
    res
      .cookie(ADMIN_COOKIE, "", { maxAge: 0 })
      .status(401)
      .json({ message: "Solo el administrador tiene acceso." });
    return;
  }

  req.payload = checkedPayload as { role: string };
  next();
};

export { verifySession };
