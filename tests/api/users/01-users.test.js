const { test, expect } = require("@playwright/test");
const apiUtils = require("../../../utilities/apiClient.utils");
const Logger = require("../../../utilities/logger.utils");
const userResponseSchema = require("./users.schema.json");
const { matchersWithOptions } = require("jest-json-schema");
const dataRequest = require("./users.data.json");

let testUserId;

expect.extend(
  matchersWithOptions({
    schemas: [require("./users.schema.json")], // Path to your schema file
  })
);

test.beforeAll(async () => {
  await apiUtils.createContext(); // Create a single API request context for all tests
});

test.afterAll(async () => {
  await apiUtils.disposeContext(); // Clean up the request context
});

// What this will do is if there is a test id in the code, it will activate this code.
test.afterEach(async () => {
  if (testUserId) {
    await apiUtils.sendRequest('delete',`/users/${testUserId}`);
  }
  // await apiUtils.context.disposeContext();
});

test(
  "should authenticate with valid credentials",
  {
    tag: ["@smoke"],
  },
  async () => {
    const response = await apiUtils.get("/users");
    // Logger.logResponse(response);
    expect(response).toBeTruthy();
    expect(response.status()).toBe(200);
  }
);

test("should validate a post request @smoke", async () => {
  const response = await apiUtils.sendRequest('post',"/users/register", {data: {
    firstName: "Test-1",
    lastName: "lehman ",
    email: "user4@test.com",
    password: "Test@123",
    mobileNumber: "0987656789",
    otp: "45435345",
  }});
  Logger.logResponse(response);

  const getResponse = await apiUtils.sendRequest("get","/users");
  Logger.logResponse(getResponse);

  //Assertions
  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(201);
  const responseBody = await response.json();
  expect(responseBody).toMatchSchema(userResponseSchema);
  expect(responseBody).toHaveProperty(
    "message",
    "Users registered successfully"
  );
  expect(responseBody.data).toHaveProperty("firstName", "Test-1");

  const createdUser = await response.json();
  testUserId = createdUser.data._id; // Store for cleanup
});

test("should validate a post request with JSON from a data file", async () => {
  const response = await apiUtils.sendRequest("post","/users/register", {data: dataRequest});

  //Assertions
  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(201);
  const responseBody = await response.json();
  expect(responseBody).toMatchSchema(userResponseSchema);
  expect(responseBody).toHaveProperty(
    "message",
    "Users registered successfully"
  );
  expect(responseBody.data).toHaveProperty("firstName", "Test-1");

  testUserId = responseBody.data._id; // Store for cleanup
});
