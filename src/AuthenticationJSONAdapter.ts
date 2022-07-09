import fs from "fs";
import { Employee } from "./Employee";

export function createEmployee(
  outputPath: string,
  name: string,
  passwort: string
) {
  const currentData = fs.readFileSync(outputPath, "utf-8");
  const data = JSON.parse(currentData);

  const newEmployee = new Employee(name, passwort)

  data["employees"].push(newEmployee);
  const updateData = JSON.stringify(data);
  fs.writeFileSync(outputPath, updateData);
}
