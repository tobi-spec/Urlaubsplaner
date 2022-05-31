const express = require("express");
const adapter = require("./EmployeeJSONAdapter")
const app = express();
const port = 3000;

app.get('/liveliness', (req, res) => {
  res.send('Server Runs!');
});

app.get('/employees', (req, res) => {
  const employees = adapter.getNames()
  res.send(employees);
});

app.get('/index', function(req, res) {
  res.sendFile('/home/tobi/projects/Urlaubsplaner/src/backend/index.html');
});

app.get('/index.css', function(req, res) {
  res.sendFile('/home/tobi/projects/Urlaubsplaner/src/backend/index.css');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});