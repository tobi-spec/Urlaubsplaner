const adapter = require("../src/EmployeeJSONAdapter");

describe("Test EmployeeJSONAdapater", () => {
    test("If ", () => {
        const result = adapter.createPlotConfig()
        expect(result.data.labels).toBeTruthy
    })
})