const fs = require("fs")
var jsonata = require("jsonata");

export function getPlotConfig() {

    const data = {
    labels: getNames(),
    datasets: [{
        data: getVaccations(0),
        backgroundColor: getColors()
    },
    {
        data: getVaccations(1),
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
    const rawData = fs.readFileSync("./data/data.json", "utf-8");
    const data = JSON.parse(rawData);
    const expression = jsonata("employees.name")
    return expression.evaluate(data)
}

function getColors(): string[] {
    const rawData = fs.readFileSync("./data/colors.json", "utf-8");
    const data = JSON.parse(rawData);
    const expression = jsonata("colors")
    return expression.evaluate(data)
}

function getVaccations(number: number): string[] {
    const rawData = fs.readFileSync("./data/data.json", "utf-8");
    const data = JSON.parse(rawData);
    const string = `employees.[vaccation[${number}]]`
    const expression = jsonata(string)
    return expression.evaluate(data)
}


