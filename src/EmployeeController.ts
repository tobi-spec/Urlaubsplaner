import express, { Request, Response } from 'express';
const adapter = require("./EmployeeJSONAdapter")
const app = express();
const port = 3000;

app.get('/status', (req: Request, res: Response) => {
  const result = adapter.createDataSets()
  res.send(result)
});

app.get('/data', (req: Request, res: Response) => {
  const config = adapter.createPlotConfig()
  res.send(config);
});

app.get('/index', function(req: Request, res: Response) {
  res.sendFile('./static/index.html', { root: __dirname });
});

app.get('/index.css', function(req: Request, res: Response) {
  res.sendFile('/static/index.css', { root: __dirname });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});