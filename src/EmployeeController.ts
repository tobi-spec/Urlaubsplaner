import express, { Request, Response } from "express";
import flash from "express-flash";
import session from "express-session";
import {
  strategy,
  serializerFunction,
  deserializerFunction,
} from "./authentification/AuthService";
import passport from "passport";
//TODO: format import?
const authRouter = require("./authentification/AuthRouter");
const calendarRouter = require("./calendar/CalendarRouter");

const sessionParams = {
  secret: "env.secret", // move to .env file
  resave: false,
  saveUninitialized: true
};

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set("view-engine", "ejs");
app.set("views", __dirname);
app.use(session(sessionParams));
app.use(flash());
passport.use(strategy);
passport.serializeUser(serializerFunction);
passport.deserializeUser(deserializerFunction);
app.use(passport.initialize());
app.use(passport.session());
app.use(authRouter);
app.use(calendarRouter)

app.get("/status", (req: Request, res: Response) => {
  res.json("Server runs!");
});

app.get("/", (req: Request, res: Response) => {
  res.redirect("/login");
});

export default app;
