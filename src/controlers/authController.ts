import { Response, Request } from "express";
import * as queries from "../db/queries.js";

export const registerPost = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const userInfo = req.body;

  await queries.createUser(userInfo);

  res.status(200).send();
};
