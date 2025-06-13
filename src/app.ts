import express, { Express, Router } from "express";
import authRouter from "./routes/authRouter.js";
import { errorMiddleware } from "./middleware/errorMiddleware.js";

export const createApp = (additionalRouter?: Router): Express => {
  const app = express();

  app.use(express.json());

  app.use(authRouter);

  if (additionalRouter !== undefined) {
    app.use(additionalRouter);
  }

  app.use(errorMiddleware);
  return app;
};

const app = createApp();
export default app;
