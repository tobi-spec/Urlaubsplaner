import { EmployeeJSONAdapater } from "../EmployeeJSONAdapter";

export class PlotConfig {
  employeeJSONAdapater: EmployeeJSONAdapater;
  type: string;
  // types?
  data: any;
  options: any;

  opt = {
    plugins: {
      legend: {
        display: false
      }
    },
    indexAxis: "y",
    scales: {
      xAxes: {
        min: new Date(new Date().getFullYear(), 0, 1),
        max: new Date(new Date().getFullYear(), 11, 31),
        type: "time",
        time: {
          unit: "day"
        }
      }
    }
  };

  constructor() {
    this.employeeJSONAdapater = new EmployeeJSONAdapater("./data/data.json");
    this.type = "bar";
    this.data = {
      labels: this.employeeJSONAdapater.getNames(),
      datasets: this.employeeJSONAdapater.createDataSets()
    };
    this.options = this.opt;
  }
}
