import { NextFunction, Request, Response, Router } from "express";
import * as authController from "../controlers/authController.js";

const router = Router();

router.post("/register", authController.registerPost);

export default router;
