const { test, expect } = require("@playwright/test");
const apiUtils = require("../../../utilities/apiClient.utils");
const Logger = require("../../../utilities/logger.utils");
const generateUser = require("./dynamic-request.data");

test.describe("User Positive Test Cases", () => {
  let testUserId;
  test.beforeAll(async () => {
    await apiUtils.createContext(); // Fresh context per test
  });

  test.afterAll(async () => {
    await apiUtils.disposeContext(); // Clean up the request context
  });

  test.afterEach(async () => {
    if (testUserId) {
      await apiUtils.delete(`/users/${testUserId}`);
    }
  });

  // Tests
  test.skip("GET /users returns valid structure", async () => {
    const response = await apiUtils.get("/users");
    await Logger.logResponse(response);
  });
});

test.describe("User Negative Scenarios", () => {
  let testUserId;
  test.beforeAll(async () => {
    await apiUtils.createContext(); // Fresh context per test
  });

  test.afterAll(async () => {
    await apiUtils.disposeContext(); // Clean up the request context
  });

  test.afterEach(async () => {
    if (testUserId) {
      await apiUtils.delete(`/users/${testUserId}`);
    }
  });

  test.skip("GET /users returns valid structure @smoke @performance", async () => {
    const response = await apiUtils.get("/users");
    await Logger.logResponse(response);
    expect(response.status()).toBe(200);
  });
});
