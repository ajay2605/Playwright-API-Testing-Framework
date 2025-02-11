const { test, expect } = require("@playwright/test");
const apiClientUtils = require("../../utilities/apiClient.utils");

test.beforeAll(async () => {
  await apiClientUtils.createContext();
});

test.afterAll(async () => {
  await apiClientUtils.disposeContext();
});

test("Verify if we can get all users", async () => {
  const response = await apiClientUtils.sendRequest("get", "/users");
  const body = await response.json();
  console.log(body);

  expect(response.status()).toBe(200);
});
