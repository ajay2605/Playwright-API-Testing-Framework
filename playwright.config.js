const { defineConfig } = require("@playwright/test");

module.exports = defineConfig({
  reporter: [
    ["list"], // Keep default terminal output
    [
      "allure-playwright",
      // {
      //   outputFolder:
      //     process.env.ALLURE_RESULTS_DIR || "reports/allure-results",
      // },
    ],
  ],
});
