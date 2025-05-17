import { jwtSecret } from "../config.js";
import jwt from "jsonwebtoken";

function signToken(payload) {
  const oneHour = 3600;
  const signConfig = {
    expiresIn: oneHour,
  };
  return jwt.sign(payload, jwtSecret, signConfig);
}
function verifyToken(token) {
  const verifiedToken = jwt.verify(token, jwtSecret);
  if (!verifiedToken) return false;

  return verifiedToken;
}

export { signToken, verifyToken };
