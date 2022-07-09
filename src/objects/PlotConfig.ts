import { getNames, createDataSets } from "../EmployeeJSONAdapter"

export class PlotConfig {
    type:string
    // types?
    data: any
    options: any

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
      }

    constructor() {
        this.type = "bar"
        this.data = { labels: getNames(), datasets: createDataSets() }
        this.options = this.opt
    }
}




