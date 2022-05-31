const express = require("express");
const app = express();
const port = 3000;

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://127.0.0.1:5500");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/liveliness', (req, res) => {
  res.send('Server Runs!');
});

app.get('/employees', (req, res) => {
  const employees = ["Joachim", "Jörg", "Martina", "Ali", "Christian", "Tami", "Ute"]
  res.send(employees);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});