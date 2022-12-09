import { PlotConfig } from "../../../src/models/PlotConfig";
import { expect } from "@jest/globals";

describe("unittest for PlotConfig class", () => {
  test("test PlotConfig constructor ", () => {
    const result = new PlotConfig();
    expect(result.type).toBe("bar");
    expect(result.data.labels).toBeTruthy;
    expect(result.options.plugins.legend.display).toBeFalsy;
    expect(result.options.indexAxis).toBe("y");
    expect(result.options.scales.xAxes.type).toBe("time");
    expect(result.options.scales.xAxes.time.unit).toBe("day");
  });
});
