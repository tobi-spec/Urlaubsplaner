import express, { Request, Response } from "express";
import { PlotConfig } from "./models/PlotConfig";
const authRouter = require("./AuthRouter")


const app = express();

app.use(express.urlencoded({ extended: false }));

app.get("/status", (req: Request, res: Response) => {
  res.json("Server runs!");
});

app.get("/data", (req: Request, res: Response) => {
  const config = new PlotConfig()
  res.json(config);
});

app.get("/index", function (req: Request, res: Response) {
  res.sendFile("./static/index.html", { root: __dirname });
});

app.get("/index.css", function (req: Request, res: Response) {
  res.sendFile("/static/index.css", { root: __dirname });
});

app.use("/auth", authRouter)



export default app;
