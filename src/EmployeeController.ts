const express = require("express");
const adapter = require("./EmployeeJSONAdapter")
const app = express();
const port = 3000;

app.get('/status', (req, res) => {
  res.send('Server Runs!');
});

app.get('/data', (req, res) => {
  const employees = adapter.getNames()
  const employeeFirstVacationArray = [
    ['2022-01-01', '2022-03-03'],
    ['2022-04-03', '2022-04-23'],
    ['2022-08-06', '2022-09-07'],
    ['2022-03-07', '2022-04-09'],
    ['2022-07-09', '2022-09-13'],
    ['2022-10-13', '2022-10-31'],
    ['2022-02-15', '2022-03-21']
]

  const employeeSecondVacationArray = [
    ['2022-10-03', '2022-11-30'],
    ['2022-11-03', '2022-11-23'],
    ['2022-02-06', '2022-03-07'],
    ['2022-07-07', '2022-08-09'],
    ['2022-01-09', '2022-02-13'],
    ['2022-02-13', '2022-03-31'],
    ['2022-11-15', '2022-12-21']
  ]

  const chartColors = [
  'rgba(255, 26, 104, 1)',
    'rgba(54, 162, 235, 1)',
    'rgba(255, 206, 86, 1)',
    'rgba(75, 192, 192, 1)',
    'rgba(153, 102, 255, 1)',
    'rgba(255, 159, 64, 1)',
    'rgba(0, 0, 0, 1)'
  ]


  // setup 
  const data = {
  labels: employees,
  datasets: [{
    data: employeeFirstVacationArray,
    backgroundColor: chartColors
  },
  {
    data: employeeSecondVacationArray,
    backgroundColor: chartColors
  }
  ]
  };

// config 
// request from backend
const config = {
type: 'bar',
data,
options: {
  plugins: {
    legend: {
      display: false
            }
          },
  indexAxis: 'y',
  scales: {
      xAxes: {
          min: '2022-01-01',
          max: '2022-12-31',
          type: 'time',
          time: {
              unit: 'day'
          }
      },
    yAxes:{
    }
  }
}
};
  res.send(config);
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