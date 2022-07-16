import fs from "fs";
import jsonata from "jsonata";
import { Employee } from "./models/Employee";
import bcrypt from "bcrypt";

export class EmployeeJSONAdapater {
  path:string

  constructor(path:string) {
    this.path = path
  }

  public async createEmployee(
    name: string,
    passwort: string
  ) {
    const currentData = fs.readFileSync(this.path, "utf-8");
    const data = JSON.parse(currentData);
    const hash = await bcrypt.hash(passwort, 10)
    
    const newEmployee = new Employee(name, hash)
    data["employees"].push(newEmployee);
    const updateData = JSON.stringify(data, null, "\t");
    fs.writeFileSync(this.path, updateData);
    }

  public getEmployeeByName(wantedName:string){
    const names: string[] = this.getNames()
    const position = names.indexOf(wantedName)
    if(position === -1){
      return null
    } else {
      return this.getEmployeeByPosition(position)
    }
  }

  getEmployeeByPosition(position: number): string[] {
    return this.getJSONData(`employees[${position}]`)
  }
  
  // write test
  public getNames(): string[] {
    return this.getJSONData("employees.name");
  }
  
    // write tests
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


