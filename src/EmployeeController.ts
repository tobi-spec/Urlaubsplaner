import express, { Request, Response } from "express";
import { createPlotConfig } from "./EmployeeJSONAdapter";
import { createUser } from "./AuthenticationJSONAdapter";
import bcrypt from "bcrypt";

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

// TODO: auth functions into express subfolder

app.get("/register", function (req: Request, res: Response) {
  res.sendFile("./static/register.html", { root: __dirname });
});

app.post("/register", async function (req: Request, res: Response) {
  // if user created, if user already exists,
  const hashedPassword = await bcrypt.hash(req.body.passwort, 10)
  try {
    createUser(
      "./data/data.json",
      req.body.name,
      req.body.email,
      hashedPassword
    );
    res.redirect("/login")
  } catch {
    // display message why registry was not successfull
    res.redirect("/register")
  }

});

app.get("/login", function (req: Request, res: Response) {
  res.sendFile("./static/login.html", { root: __dirname });
});

app.post("/login", function (req: Request, res: Response) {});

export default app;
