const fs = require("fs")
var jsonata = require("jsonata");

export function getNames(): string[] {
    const rawData = fs.readFileSync("./data.json", "utf-8");
    const data = JSON.parse(rawData);
    const expression = jsonata("employees.name")
    return expression.evaluate(data)
}


