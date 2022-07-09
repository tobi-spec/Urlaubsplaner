import fs from "fs";
import jsonata from "jsonata";
import { Employee } from "./models/Employee";

export class EmployeeJSONAdapater {
  path:string

  constructor(path:string) {
    this.path = path
  }

  public createEmployee(
    name: string,
    passwort: string
  ) {
    const currentData = fs.readFileSync(this.path, "utf-8");
    const data = JSON.parse(currentData);
  
    const newEmployee = new Employee(name, passwort)
  
    data["employees"].push(newEmployee);
    const updateData = JSON.stringify(data, null, "\t");
    fs.writeFileSync(this.path, updateData);
  }
  
  public getNames(): string[] {
    return this.getJSONData("employees.name");
  }
  
  public createDataSets() {
    const count = this.countEmployees();
    let max = 0;
    for (let i = 0; i < count; i++) {
      const occurency = this.countEmployeeVaccationTimes(i);
      if (occurency > max) {
        max = occurency;
      }
    }
    const datasetArray = [];
    for (let i = 0; i < max; i++) {
      const dataset = {
        data: this.getVaccations(i),
        backgroundColor: this.getColors()
      };
      datasetArray.push(dataset);
    }
    return datasetArray;
  }
  
  countEmployees(): number {
    return this.getJSONData(`$count(employees)`);
  }
  
  countEmployeeVaccationTimes(employee: number): number {
    return this.getJSONData(
      `$count(employees[${employee}].vaccation)`
    );
  }
  
  getVaccations(position: number): string[] {
    return this.getJSONData(`employees.[vaccation[${position}]]`);
  }
  
  getColors(): string[] {
    return this.getJSONData("colors");
  }
  
  // output of function is sometimes string and sometimes number, how to set output type?
  getJSONData(jasonataExpression: string) {
    const rawData = fs.readFileSync(this.path, "utf-8");
    const data = JSON.parse(rawData);
    const expression = jsonata(jasonataExpression);
    return expression.evaluate(data);
  }


}


