import fs from "fs";
import jsonata from "jsonata";

export class JsonAdapater {
  path: string;

  constructor(path: string) {
    this.path = path;
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
