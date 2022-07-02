import express, { Request, Response } from "express";
import { createPlotConfig } from "./EmployeeJSONAdapter";
import { createUser } from "./AuthenticationJSONAdapter";

const app = express();

app.use(express.urlencoded({ extended: false }));

app.get("/status", (req: Request, res: Response) => {
  res.json("Server runs!");
});

app.get("/data", (req: Request, res: Response) => {
  const config = createPlotConfig();
  res.json(config);
});

app.get("/index", function (req: Request, res: Response) {
  res.sendFile("./static/index.html", { root: __dirname });
});

app.get("/index.css", function (req: Request, res: Response) {
  res.sendFile("/static/index.css", { root: __dirname });
});

app.get("/register", function (req: Request, res: Response) {
  res.sendFile("./static/register.html", { root: __dirname });
});

app.post("/register", function (req: Request, res: Response) {
  createUser(
    "../data/user.json",
    req.body.name,
    req.body.email,
    req.body.passwort
  );
});

app.get("/login", function (req: Request, res: Response) {
  res.sendFile("./static/login.html", { root: __dirname });
});

app.post("/login", function (req: Request, res: Response) {});

export default app;
