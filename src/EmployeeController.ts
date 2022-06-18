import express, { Request, Response } from "express";
import { createPlotConfig } from "./EmployeeJSONAdapter";


const app = express();

app.get("/status", (req: Request, res: Response) => {
  res.json("Server runs!");
});

app.get("/data", (req: Request, res: Response) => {
  const config = createPlotConfig();
  res.send(config);
});

app.get("/index", function (req: Request, res: Response) {
  res.sendFile("./static/index.html", { root: __dirname });
});

app.get("/index.css", function (req: Request, res: Response) {
  res.sendFile("/static/index.css", { root: __dirname });
});

export default app

