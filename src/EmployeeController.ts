const express = require("express");
const adapter = require("./EmployeeJSONAdapter")
const app = express();
const port = 3000;

app.get('/status', (req, res) => {
  res.send('Server Runs!');
});

app.get('/data', (req, res) => {
  const config = adapter.getPlotData()
  res.send(config);
});

app.get('/index', function(req, res) {
  res.sendFile('index.html', { root: __dirname });
});

app.get('/index.css', function(req, res) {
  res.sendFile('index.css', { root: __dirname });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});