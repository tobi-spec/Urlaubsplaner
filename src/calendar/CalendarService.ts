import { JsonAdapater } from "../JsonAdapter";
import { DataSet } from "vis-data";

type item = {
  id: number;
  start: string;
  end: string;
  group: string;
}

type group = {
  id: number;
  content: string;
}

export class CalendarService {
  jsonHolidayAdapter: JsonAdapater;
  jsonEmployeeAdapater: JsonAdapater;
  pathHoliday: string;
  pathEmployee: string;

  constructor(pathHoliday: string, pathEmployee: string) {
    this.jsonHolidayAdapter = new JsonAdapater(pathHoliday);
    this.jsonEmployeeAdapater = new JsonAdapater(pathEmployee)
  }

  public createItems(): item[]  {
    const data = this.jsonHolidayAdapter.getJsonData()
    const set = new DataSet<item>();
    set.add(data)
    return set.get()
  }

  public createGroups(): group[] {
    return this.jsonEmployeeAdapater.getJSONDataByExpression("employees.{\"id\": id, \"content\": name}")
  }

  // Will be used later, when calendar will be styled
  public createOptions() {
    return null
  }
}