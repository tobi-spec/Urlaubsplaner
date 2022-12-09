import express, { NextFunction, Request, Response } from "express";
import { CalendarConfig } from "./CalendarConfig";
import { isAuth } from "../authentification/AuthService";

const calendarRouter = express.Router();

calendarRouter.get("/data", isAuth, (req: Request, res: Response) => {
    const config = new CalendarConfig();
    res.json(config);
  });

calendarRouter.get("/index", isAuth, function (req: Request, res: Response) {
res.render("./views/index.ejs", { root: __dirname + '/../' });
});

calendarRouter.get("/index.css", isAuth, function (req: Request, res: Response) {
res.sendFile("/views/index.css", { root: __dirname + '/../' });
});

calendarRouter.get("/icons8-logout-50.png", function (req: Request, res: Response) {
res.sendFile("/views/icons8-logout.png", { root: __dirname + '/../' });
});

module.exports = calendarRouter;