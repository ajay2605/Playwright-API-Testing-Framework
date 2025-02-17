const { defineConfig } = require("@playwright/test");

module.exports = defineConfig({
  reporter: [
    ["list"], // Keep default terminal output
    // ["dot"] ,
    // ["html"],
    [
      "allure-playwright",
      {
        resultsDir:
          process.env.ALLURE_RESULTS_DIR || "reports/allure-results",
      },
    ],
  ],
});
