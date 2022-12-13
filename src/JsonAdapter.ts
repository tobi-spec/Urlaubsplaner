import fs from "fs";
import jsonata from "jsonata";
import { Employee } from "./employee/Employee";
import bcrypt from "bcrypt";

export class JsonAdapater {
  path: string;

  constructor(path: string) {
    this.path = path;
  }

  public async createEmployee(name: string, passwort: string) {
    const currentData = fs.readFileSync(this.path, "utf-8");
    const data = JSON.parse(currentData);
    const hash = await bcrypt.hash(passwort, 10);

    const newEmployee = new Employee(name, hash);
    data["employees"].push(newEmployee);
    const updateData = JSON.stringify(data, null, "\t");
    fs.writeFileSync(this.path, updateData);
  }

  public async getEmployeeByName(wantedName: string) {
    const names: string[] = this.getJSONDataByExpression("employees.name");
    const position = names.indexOf(wantedName);
    if (position === -1) {
      return null;
    } else {
      return this.getJSONDataByExpression(`employees[${position}]`);
    }
  }

  // output of function is sometimes string and sometimes number, how to set output type?
  getJSONDataByExpression(jasonataExpression: string) {
    const rawData = fs.readFileSync(this.path, "utf-8");
    const data = JSON.parse(rawData);
    const expression = jsonata(jasonataExpression);
    return expression.evaluate(data);
  }

  getJsonData() {
    const rawData = fs.readFileSync(this.path, "utf-8");
    return JSON.parse(rawData);
  }
}
