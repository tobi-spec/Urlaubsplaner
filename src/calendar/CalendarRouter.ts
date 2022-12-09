import express, { NextFunction, Request, Response } from "express";
import { CalendarConfig } from "./CalendarConfig";
import { isAuth } from "../authentification/AuthService";

const calendarRouter = express.Router();

calendarRouter.get("/data", isAuth, (req: Request, res: Response) => {
    const config = new CalendarConfig();
    res.json(config);
  });

  module.exports = calendarRouter;