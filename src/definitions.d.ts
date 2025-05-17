import type { Request } from "express";

type Payload = {
  role: string;
};
interface RequestWithPayload extends Request {
  payload: Payload;
}
