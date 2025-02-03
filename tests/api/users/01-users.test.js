const { test, expect } = require("@playwright/test");
const Assertions = require("../../../utilities/assertions.utils");
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
  await apiUtils.dispose(); // Clean up the request context
});

// What this will do is if there is a test id in the code, it will activate this code.
test.afterEach(async () => {
  if (testUserId) {
    await apiUtils.delete(`/users/${testUserId}`);
  }
  // await apiUtils.context.dispose();
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
  const response = await apiUtils.post("/users/register", {
    firstName: "Test-1",
    lastName: "lehman ",
    email: "user1@test.com",
    password: "Test@123",
    mobileNumber: "0987656789",
    otp: "",
  });

  const getResponse = await apiUtils.get("/users");
  Logger.logResponse(response);

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
  const response = await apiUtils.post("/users/register", dataRequest);

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
