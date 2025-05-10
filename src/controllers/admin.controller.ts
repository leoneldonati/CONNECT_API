import type { Request, Response } from "express";

const ADMIN_COOKIE = "";
async function authAdmin(req: Request, res: Response) {
  const formData = req.body;
  const { username, password } = Object.fromEntries(formData);

  if (!username.toString().trim() || !password.toString().trim())
    return res
      .json({
        message: "¡Debes enviar una contraseña y un usuario!",
      })
      .status(400);

  const adminId = process.env.ADMIN_ID ?? "";
  const adminUser = await adminModel.findOne({
    _id: new ObjectId(adminId),
  });
  if (!adminUser)
    return {
      error: true,
      message: "¡Solo el administrador tiene acceso!",
    };
  const matchPass = await verifyPassword(
    password.toString(),
    adminUser.password
  );
  const matchUser = await verifyPassword(
    username.toString(),
    adminUser.username
  );
  if (!matchPass || !matchUser)
    return {
      error: true,
      message: "¡Solo el administrador tiene acceso!",
    };

  const jwtPrivate = process.env.PRIVATE_KEY ?? "";
  const token = jwt.sign({ created_at: new Date() }, jwtPrivate, {
    expiresIn: Date.now() + 7 * 24 * 60 * 60 * 1000,
  });

  const cookieStore = await obtainCookiesStore();

  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  cookieStore.set(ADMIN_COOKIE, token, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });

  return {
    error: false,
    message: "¡Bienvenido Nicolás!",
  };
}

export { authAdmin };
