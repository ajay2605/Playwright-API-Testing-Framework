const { test, expect } = require("@playwright/test");
const Assertions = require("../../../utilities/assertions.utils");
const apiUtils = require("../../../utilities/apiClient.utils");
const Logger = require("../../../utilities/logger.utils");
const generateUser = require("./dynamic-request.data");

let testUserId;

test.beforeAll(async () => {
  await apiUtils.createContext();
});

test.afterAll(async () => {
  await apiUtils.dispose();
});

test.afterEach(async () => {
  if (testUserId) {
    await apiUtils.delete(`/users/${testUserId}`);
  }
});

test.only("Verify if email is unique", async () => {
  const testUser1 = generateUser({});
  const response = await apiUtils.post("/users/register", testUser1);
  await Logger.logResponse(response);
  const testUser_1_ResponseBody = await response.json();

  1;
  const testUser2 = generateUser({ email: testUser_1_ResponseBody.data.email });
  const response_2 = await apiUtils.post("/users/register", testUser2);
  await Logger.logResponse(response_2);

  testUserId = testUserResponseBody.data._id;
});
