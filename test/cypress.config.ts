import { defineConfig } from "cypress";

export default defineConfig({
  videosFolder: "./test/e2e/videos",
  screenshotsFolder: "./test/e2e/screenshots",
  e2e: {
    baseUrl: "http://localhost:3000",
    specPattern: "test/e2e/**/*.cy.{js,jsx,ts,tsx}",
    supportFile: false
  }
});
