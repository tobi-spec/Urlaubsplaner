import express, { Request, Response } from "express";
import adapter = require("./EmployeeJSONAdapter");
const app = express();
const port = 3000;

app.get("/status", (req: Request, res: Response) => {
  res.send("Server runs!");
});

app.get("/data", (req: Request, res: Response) => {
  const config = adapter.createPlotConfig();
  res.send(config);
});

app.get("/index", function (req: Request, res: Response) {
  res.sendFile("./static/index.html", { root: __dirname });
});

app.get("/index.css", function (req: Request, res: Response) {
  res.sendFile("/static/index.css", { root: __dirname });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
