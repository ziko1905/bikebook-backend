import { Request, Response, NextFunction } from "express";
import { RequestError } from "../errors/RequestError.js";
import { CODE_ERROR_MESSAGE } from "../constants.js";

export const errorMiddleware = (
  err: Error | RequestError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (Object.getPrototypeOf(err) === Error.prototype) {
    console.error(err.stack);
    return res.status(500).send({ error: CODE_ERROR_MESSAGE });
  }

  res.status((err as RequestError).statusCode).send({
    error: err.message,
  });
};
