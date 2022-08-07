import express, { Request, Response } from "express";
import flash from "express-flash";
import session from "express-session";
import { PlotConfig } from "./models/PlotConfig";
import {
  strategy,
  serializerFunction,
  deserializerFunction,
  isAuth
} from "./AuthService";
import passport from "passport";
//TODO: format import?
const authRouter = require("./AuthRouter");

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

app.get("/status", (req: Request, res: Response) => {
  res.json("Server runs!");
});

app.get("/data", isAuth, (req: Request, res: Response) => {
  const config = new PlotConfig();
  res.json(config);
});

app.get("/index", isAuth, function (req: Request, res: Response) {
  res.render("./views/index.ejs", { root: __dirname });
});

app.get("/index.css", isAuth, function (req: Request, res: Response) {
  res.sendFile("/views/index.css", { root: __dirname });
});

export default app;
