const { test, expect } = require("@playwright/test");
const apiUtils = require("../../../utilities/apiClient.utils");
const Logger = require("../../../utilities/logger.utils");
const generateUser = require("./dynamic-request.data");

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

test("POST /users/register creates new user", async () => {
  const testUser = generateUser(
    "ajay",
    "kumar",
    "ajay@test.com",
    "Test@123",
    "876546789",
    "908765"
  );
  const response = await apiUtils.post("/users/register", testUser);
  await Logger.logResponse(response);
  const createdUser = await response.json();
  testUserId = createdUser.data._id; // Store for cleanup
});

test("Verify if firstname cannot be null", async () => {
  const testUser = generateUser({ firstName: null });
  const response = await apiUtils.post("/users/register", testUser);
  await Logger.logResponse(response);
  expect(response.status()).toBe(500);
  expect(response).toBeFalsy;

  const responseBody = await response.json();
  expect(responseBody).toHaveProperty("message", "Unexpected error occured");
});

test("Verify is First Name cannot be empty", async () => {
  const testUser = generateUser({ firstName: "" });
  const response = await apiUtils.post("/users/register", testUser);
  await Logger.logResponse(response);

  // Assertions
  expect(response.status()).toBe(500);

  const responseBody = await response.json();
  expect(responseBody).toHaveProperty("message", "Unexpected error occured");
});

test("Verify is Mobile cannot be empty", async () => {
  const testUser = generateUser({ mobileNumber: "" });
  const response = await apiUtils.post("/users/register", testUser);
  await Logger.logResponse(response);

  // Assertions
  expect(response.status()).toBe(500);

  const responseBody = await response.json();
  expect(responseBody).toHaveProperty("message", "Unexpected error occured");
});

test("Verify is Mobile cannot be null", async () => {
  const testUser = generateUser({ mobileNumber: null });
  const response = await apiUtils.post("/users/register", testUser);
  await Logger.logResponse(response);

  // Assertions
  expect(response.status()).toBe(500);

  const responseBody = await response.json();
  expect(responseBody).toHaveProperty("message", "Unexpected error occured");
});
