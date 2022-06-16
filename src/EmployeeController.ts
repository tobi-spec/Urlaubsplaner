import express from 'express';
const adapter = require("./EmployeeJSONAdapter")
const app = express();
const port = 3000;

app.get('/status', (req, res) => {
  const result = adapter.createDataSets()
  res.send(result)
});

app.get('/data', (req, res) => {
  const config = adapter.createPlotConfig()
  res.send(config);
});

app.get('/index', function(req, res) {
  res.sendFile('./static/index.html', { root: __dirname });
});

app.get('/index.css', function(req, res) {
  res.sendFile('/static/index.css', { root: __dirname });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});