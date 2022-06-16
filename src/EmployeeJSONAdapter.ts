const fs = require("fs")
const jsonata = require("jsonata");

export function createPlotConfig(): Object {
    const data = createData()
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

function createData(): Object {
    const data = {
        labels: getNames(),
        datasets: createDataSets()
    };
    console.log(data)
    return data
}

export function createDataSets() {
    const count = countEmployees()
    let max = 0;
    for (let i=0; i<count; i++) {
        const occurency = countEmployeeVaccationTimes(i)
        if (occurency > max) {
            max = occurency
        }
    }
    let datasetArray = [];
    for(let i=0; i<max; i++) {
        const dataset = {
            data: getVaccations(i),
            backgroundColor: getColors()
        }
        datasetArray.push(dataset)
    }
    return datasetArray
}

function getNames(): string[] {
    const rawData = fs.readFileSync("./data/data.json", "utf-8");
    const data = JSON.parse(rawData);
    const expression = jsonata("employees.name")
    return expression.evaluate(data)
}

function countEmployees(): number {
    const rawData = fs.readFileSync("./data/data.json", "utf-8");
    const data = JSON.parse(rawData);
    const expressionString = `$count(employees)`
    const expression = jsonata(expressionString)
    return expression.evaluate(data)
}

function countEmployeeVaccationTimes(employee: number): number {
    const rawData = fs.readFileSync("./data/data.json", "utf-8");
    const data = JSON.parse(rawData);
    const expressionString = `$count(employees[${employee}].vaccation)`
    const expression = jsonata(expressionString)
    return expression.evaluate(data)
} 

function getVaccations(position: number): string[] {
    const rawData = fs.readFileSync("./data/data.json", "utf-8");
    const data = JSON.parse(rawData);
    const expressionString = `employees.[vaccation[${position}]]`
    const expression = jsonata(expressionString)
    return expression.evaluate(data)
}

function getColors(): string[] {
    const rawData = fs.readFileSync("./data/colors.json", "utf-8");
    const data = JSON.parse(rawData);
    const expression = jsonata("colors")
    return expression.evaluate(data)
}


