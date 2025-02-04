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

test.describe("User API Tests", () => {
  let testUserId;

  test.beforeAll(async () => {
    await apiUtils.createContext(); // Fresh context per test
  });

  test.afterAll(async () => {
    await apiUtils.dispose(); // Clean up the request context
  });

  // This below code will find testUserId in each test. If it has found it, then it will call the delete api and delete it. Or else it will move forward.

  //   This is really need to clean up our tests. We should always do it.

  test.afterEach(async () => {
    if (testUserId) {
      await apiUtils.delete(`/users/${testUserId}`);
    }
  });

  // No Test-User-Id, so nothing happens
  test("GET /users returns valid structure", async () => {
    const response = await apiUtils.get("/users");
    await Logger.logResponse(response);
  });

  //   Test-user-Id is present, so it will delete the user.
  // @Performance
  test("POST /users/register creates new user", {tag: ["@Performance"]}, async () => {
    const testUser = generateTestUser();
    const response = await apiUtils.post("/users/register", testUser);
    const createdUser = await response.json();
    testUserId = createdUser.data._id; // Store for cleanup

    await Logger.logResponse(response);
  });
});
