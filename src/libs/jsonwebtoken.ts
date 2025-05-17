import { jwtSecret } from "@config.js";
import jwt from "jsonwebtoken";

function signToken(payload: string | object | Buffer) {
  const oneHour = 3600;
  const signConfig: jwt.SignOptions = {
    expiresIn: oneHour,
  };
  return jwt.sign(payload, jwtSecret, signConfig);
}
function verifyToken(token: string) {
  const verifiedToken = jwt.verify(token, jwtSecret);
  if (!verifiedToken) return false;

  return verifiedToken;
}

export { signToken, verifyToken };
