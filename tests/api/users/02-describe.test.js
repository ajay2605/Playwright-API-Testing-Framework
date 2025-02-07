const { test, expect } = require("@playwright/test");
const apiUtils = require("../../../utilities/apiClient.utils");
const Logger = require("../../../utilities/logger.utils");

// 1. Test Data Factory
const generateTestUser = () => ({
  firstName: `Test-${Math.floor(Math.random() * 1000)}`,
  lastName: `User-${Date.now()}`,
  email: `user${Date.now()}@test.com`,
  password: `Test@${Math.random().toString(36).slice(2, 8)}`,
  mobileNumber: `+1${Math.floor(Math.random() * 10000000000)}`,
});

// 2. Test Setup/Cleanup
test.describe("User API Tests", () => {
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

  // 3. Atomic Tests
  test.skip("GET /users returns valid structure", async () => {
    const response = await apiUtils.get("/users");
    await Logger.logResponse(response);
  });

  test.skip("POST /users/register creates new user", async () => {
    const testUser = generateTestUser();
    const response = await apiUtils.post("/users/register", testUser);
    await Logger.logResponse(response);
    const createdUser = await response.json();
    testUserId = createdUser.data._id; // Store for cleanup
  });

  test.skip("POST /users/register creates new user - 2", async () => {
    const testUser = generateTestUser();
    const response = await apiUtils.post("/users/register", testUser);
    await Logger.logResponse(response);
    const createdUser = await response.json();
    testUserId = createdUser.data._id; // Store for cleanup
  });

  test.skip("POST /users/register creates new user - 3", async () => {
    const testUser = generateTestUser();
    const response = await apiUtils.post("/users/register", testUser);
    await Logger.logResponse(response);
    const createdUser = await response.json();
    testUserId = createdUser.data._id; // Store for cleanup
  });
});
