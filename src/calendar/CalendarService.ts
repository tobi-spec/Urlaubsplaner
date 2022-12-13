import { JsonAdapater } from "../JsonAdapter";

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
  jsonAdapater: JsonAdapater;
  path: string;

  constructor(path: string) {
    this.jsonAdapater = new JsonAdapater(path);
  }

  public createItems() {
    return this.jsonAdapater.getEmployeesVaccations()
  }

  public async createGroups():Promise <[group]> {
    return await this.jsonAdapater.getEmployeeNameAndId()
  }

  // Will be used later, when calendar will be styled
  public createOptions() {
    return null
  }
}