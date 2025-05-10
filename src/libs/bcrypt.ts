import { hash, compare } from "bcrypt";
async function verifyHash(payload: string, hash: string) {
  return await compare(payload, hash);
}

const SALT_ROUNDS = 10;
async function signHash(payload: string) {
  return await hash(payload, SALT_ROUNDS);
}

export { verifyHash, signHash };
