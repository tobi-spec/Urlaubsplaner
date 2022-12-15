import express, { NextFunction, Request, Response } from "express";
import { isAuth } from "../authentification/AuthService";
import { CalendarService } from "./CalendarService";

const calendarRouter = express.Router();

const calendarService = new CalendarService("./data/holidays.json", "./data/data.json")

calendarRouter.get("/calendar", isAuth, function (req: Request, res: Response) {
res.render("./views/calendar.ejs", { root: __dirname + '/../' });
});

calendarRouter.get("/calendar.css", isAuth, function (req: Request, res: Response) {
res.sendFile("/views/calendar.css", { root: __dirname + '/../' });
});

calendarRouter.get("/icons8-logout-50.png", function (req: Request, res: Response) {
res.sendFile("/views/icons8-logout.png", { root: __dirname + '/../' });
});

calendarRouter.get("/items", isAuth, (req: Request, res: Response) => {
  const items = calendarService.createItems();
  res.json(items);
});

calendarRouter.get("/groups", isAuth, (req: Request, res: Response) => {
const groups = calendarService.createGroups();
res.json(groups);
});

calendarRouter.get("/options", isAuth, (req: Request, res: Response) => {
const options = calendarService.createOptions();
res.json(options);
});

export default calendarRouter