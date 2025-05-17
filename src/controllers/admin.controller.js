import { adminModel } from "../db/index.db.js";
import { verifyHash } from "../libs/bcrypt.js";
import { ADMIN_COOKIE, adminId, isProduction } from "../config.js";
import { signToken } from "../libs/jsonwebtoken.js";
import { ObjectId } from "mongodb";

async function authAdmin(req, res) {
  const { username, password } = req.body;

  if (!username.toString().trim() || !password.toString().trim()) {
    res.status(400).json({
      message: "¡Debes enviar una contraseña y un usuario!",
    });
    return;
  }

  try {
    const adminUser = await adminModel.findOne({
      _id: new ObjectId(adminId),
    });
    if (!adminUser) {
      res.status(401).json({
        message: "¡Solo el administrador tiene acceso!",
      });
      return;
    }
    const matchPass = await verifyHash(password.toString(), adminUser.password);
    const matchUser = await verifyHash(username.toString(), adminUser.username);
    if (!matchPass || !matchUser) {
      res.status(401).json({
        message: "¡Solo el administrador tiene acceso!",
      });

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
    res.status(500).json({ message: "Error en el servidor" });
  }
}

export { authAdmin };
