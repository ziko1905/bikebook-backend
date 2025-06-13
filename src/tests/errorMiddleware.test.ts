import request from "supertest";
import { NextFunction, Request, Response, Router } from "express";
import { createApp } from "../app.js";
import { RequestError } from "../errors/RequestError.js";
import { CODE_ERROR_MESSAGE } from "../constants.js";

const codeErrorMessage = "Some error message";
const requestErrorMessage = "Some request message";
const requestErrorStatusCode = 404;
const ErrorRouter = Router();

ErrorRouter.get("/error", (res, req, next) => {
  return next(new Error(codeErrorMessage));
});
ErrorRouter.get("/request-error", (res, req, next) => {
  return next(new RequestError(requestErrorMessage, requestErrorStatusCode));
});

const app = createApp(ErrorRouter);

const consoleErrorSpy = vi
  .spyOn(console, "error")
  .mockImplementation(() => null);

describe("errorMiddleware()", () => {
  describe("Code errors", () => {
    it("calles console.error and respondes with 500", async () => {
      const res = await request(app).get("/error").send();

      expect(consoleErrorSpy.mock.calls[0][0]).toMatch(codeErrorMessage);

      expect(res.status).toBe(500);
      expect(res.body).toStrictEqual({
        error: CODE_ERROR_MESSAGE,
      });
    });
  });

  describe("Request errors", () => {
    it("doesn't log request errors", async () => {
      const res = await request(app).get("/request-error");

      expect(consoleErrorSpy).not.toHaveBeenCalled();
    });

    it("respondes with right status code", async () => {
      const res = await request(app).get("/request-error");

      expect(res.status).toBe(requestErrorStatusCode);
    });

    it("resondes with right message in bodt", async () => {
      const res = await request(app).get("/request-error");

      expect(res.body).toStrictEqual({
        error: requestErrorMessage,
      });
    });
  });
});
