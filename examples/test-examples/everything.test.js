const { test, expect } = require("@playwright/test");
const apiClientUtils = require("../../utilities/apiClient.utils");

test.describe("User API Tests", () => {
  let testUserId;
  test.beforeAll(async () => {
    await apiClientUtils.createContext();
  });
  test.afterAll(async () => {
    await apiClientUtils.disposeContext();
  });

  test.afterEach(async () => {
    if (testUserId) {
      await apiClientUtils.sendRequest("delete", `/users/${testUserId}`);
    }
  });

  test("Get all Users", async () => {
    const response = await apiClientUtils.sendRequest("get", "/users");
    const body = await response.json();
    // console.log(body);

    expect(response.status()).toBe(200);
    expect(body).toHaveProperty("message", "Users retrieved successfully");
  });
});
