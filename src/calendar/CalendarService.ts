import { JsonAdapater } from "../JsonAdapter";
import fs from "fs";

type item = {
  id: number;
  start: string;
  end: string;
  group: number;
}

type group = {
  id: number;
  content: string;
}

export class CalendarService {
  jsonAdapter: JsonAdapater;
  path: string;

  constructor(path: string) {
    this.jsonAdapter = new JsonAdapater(path);
  }

  public createItems():Promise <[item]>  {
    const rawData = fs.readFileSync("./data/holidays.json", "utf-8");
    const data = JSON.parse(rawData);
    return data
  }

  public async createGroups():Promise <[group]> {
    return this.jsonAdapter.getJSONDataByExpression("employees.{\"id\": id, \"content\": name}")
  }

  // Will be used later, when calendar will be styled
  public createOptions() {
    return null
  }
}