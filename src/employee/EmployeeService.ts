import { JsonAdapater } from "../JsonAdapter";
import { Employee } from "./Employee";
import bcrypt from "bcrypt";
import fs from "fs";

export class CalendarService {
  jsonAdapter: JsonAdapater;
  path: string;

  constructor(path: string) {
    this.jsonAdapter = new JsonAdapater(path);
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
}