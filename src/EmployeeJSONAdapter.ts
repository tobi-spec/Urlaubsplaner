import fs from "fs";
import jsonata from "jsonata";


export function getNames(): string[] {
  return getJSONData("./data/data.json", "employees.name");
}

export function createDataSets() {
  const count = countEmployees();
  let max = 0;
  for (let i = 0; i < count; i++) {
    const occurency = countEmployeeVaccationTimes(i);
    if (occurency > max) {
      max = occurency;
    }
  }
  const datasetArray = [];
  for (let i = 0; i < max; i++) {
    const dataset = {
      data: getVaccations(i),
      backgroundColor: getColors()
    };
    datasetArray.push(dataset);
  }
  return datasetArray;
}

function countEmployees(): number {
  return getJSONData("./data/data.json", `$count(employees)`);
}

function countEmployeeVaccationTimes(employee: number): number {
  return getJSONData(
    "./data/data.json",
    `$count(employees[${employee}].vaccation)`
  );
}

function getVaccations(position: number): string[] {
  return getJSONData("./data/data.json", `employees.[vaccation[${position}]]`);
}

function getColors(): string[] {
  return getJSONData("./data/colors.json", "colors");
}

// output of function is sometimes string and sometimes number, how to set output type?
function getJSONData(jsonPath: string, jasonataExpression: string) {
  const rawData = fs.readFileSync(jsonPath, "utf-8");
  const data = JSON.parse(rawData);
  const expression = jsonata(jasonataExpression);
  return expression.evaluate(data);
}
