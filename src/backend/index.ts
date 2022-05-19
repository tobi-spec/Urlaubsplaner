const express = require("express");
const app = express();
const port = 3000;

app.get('/liveliness', (req, res) => {
  res.send('Server Runs!');
});

app.get('/employees', (req, res) => {
  const employees = ["Sven", "Jörg", "Martina", "Ali", "Christian", "Tami", "Ute"]
  res.send(employees);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});