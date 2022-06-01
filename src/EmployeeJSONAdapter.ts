const fs = require("fs")
var jsonata = require("jsonata");

export function getPlotConfig() {
    const employeeFirstVacationArray = [
        ['2022-01-01', '2022-03-03'],
        ['2022-04-03', '2022-04-23'],
        ['2022-08-06', '2022-09-07'],
        ['2022-03-07', '2022-04-09'],
    ]

    const employeeSecondVacationArray = [
        ['2022-10-03', '2022-11-30'],
    ]

    const data = {
    labels: getNames(),
    datasets: [{
        data: employeeFirstVacationArray,
        backgroundColor: getColors()
    },
    {
        data: employeeSecondVacationArray,
        backgroundColor: getColors()
    }
    ]
    };

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
            min: new Date(new Date().getFullYear(), 0, 1),
            max: new Date(new Date().getFullYear(), 11, 31),
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
    return config
}


function getNames(): string[] {
    const rawData = fs.readFileSync("./data.json", "utf-8");
    const data = JSON.parse(rawData);
    const expression = jsonata("employees.name")
    return expression.evaluate(data)
}

function getColors(): string[] {
    const rawData = fs.readFileSync("./colors.json", "utf-8");
    const data = JSON.parse(rawData);
    const expression = jsonata("colors")
    return expression.evaluate(data)
}

export function getVaccations(): string[] {
    const rawData = fs.readFileSync("./data.json", "utf-8");
    const data = JSON.parse(rawData);
    const expression = jsonata("employees.[vaccation]")
    return expression.evaluate(data)
}


