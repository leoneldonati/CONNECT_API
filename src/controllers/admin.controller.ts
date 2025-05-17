import { adminModel } from "@db/index.db.js";
import { verifyHash } from "@libs/bcrypt.js";
import { ADMIN_COOKIE, adminId, isProduction } from "@config.js";
import { signToken } from "@libs/jsonwebtoken.js";
import { ObjectId } from "mongodb";
import type { Request, Response } from "express";

async function authAdmin(req: Request, res: Response) {
  const { username, password } = req.body;

  if (!username.toString().trim() || !password.toString().trim()) {
    res
      .json({
        message: "¡Debes enviar una contraseña y un usuario!",
      })
      .status(400);
    return;
  }

  try {
    const adminUser = await adminModel.findOne({
      _id: new ObjectId(adminId),
    });
    if (!adminUser) {
      res
        .json({
          message: "¡Solo el administrador tiene acceso!",
        })
        .status(401);
      return;
    }
    const matchPass = await verifyHash(password.toString(), adminUser.password);
    const matchUser = await verifyHash(username.toString(), adminUser.username);
    if (!matchPass || !matchUser) {
      res
        .json({
          message: "¡Solo el administrador tiene acceso!",
        })
        .status(401);

      return;
    }

    const token = signToken({ role: "admin" });

    const maxAge = 60 * 60 * 1000; // ONE HOUR
    res
      .cookie(ADMIN_COOKIE, token, {
        httpOnly: isProduction,
        secure: isProduction,
        maxAge,
        sameSite: "lax",
      })
      .json({
        message: "¡Bienvenido Nicolás!",
      });
  } catch (e) {
    console.log(e);
    res.json({ message: "Error en el servidor" }).status(500);
  }
}

export { authAdmin };
