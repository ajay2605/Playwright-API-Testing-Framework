// TODO: By default, test.describe() runs tests sequentially within the block, but different test.describe() blocks can run in parallel.

// Figure this out.  Create a test.describe and add console logs for each test and see if they are running sequentially.
// Then use test.describe.parallel() and see if they are running parallely.

// If this works, then we can add one test.describe for one happy end-to-end flow, Which can be added to made smoke or performance or others.

// Also we can add some other parallel tests where we can use them for performance.

const { test, expect } = require("@playwright/test");
const apiClientUtils = require("../../utilities/apiClient.utils");

// This runs in parallel along with all other tests in the queue
test.describe.parallel("User API Tests", () => {
  test.beforeAll(async () => {
    await apiClientUtils.createContext();
  });

  test.afterAll(async () => {
    await apiClientUtils.disposeContext();
  });

  test("Test 1 ", async () => {
    console.log(`Test 1`);
    const response = await apiClientUtils.sendRequest("get", "/users");
    const body = await response.json();
    expect(response.status()).toBe(200);
  });
  test("Test 2 ", async () => {
    console.log(`Test 2`);

    const response = await apiClientUtils.sendRequest("get", "/users");
    const body = await response.json();
    expect(response.status()).toBe(200);
  });
  test("Test 3 ", async () => {
    console.log(`Test 3`);

    const response = await apiClientUtils.sendRequest("get", "/users");
    const body = await response.json();
    expect(response.status()).toBe(200);
  });
  test("Test 4 ", async () => {
    console.log(`Test 4`);

    const response = await apiClientUtils.sendRequest("get", "/users");
    const body = await response.json();
    expect(response.status()).toBe(200);
  });
});

// This group will run in parallel with the Queue, but the tests inside will run sequentially.
test.describe("User API Tests - Serial", () => {
  test.beforeAll(async () => {
    await apiClientUtils.createContext();
  });

  test.afterAll(async () => {
    await apiClientUtils.disposeContext();
  });

  test("Test 5 ", async () => {
    console.log(`Test 5`);
    const response = await apiClientUtils.sendRequest("get", "/users");
    const body = await response.json();
    expect(response.status()).toBe(200);
  });
  test("Test 6 ", async () => {
    console.log(`Test 6`);

    const response = await apiClientUtils.sendRequest("get", "/users");
    const body = await response.json();
    expect(response.status()).toBe(200);
  });
  test("Test 7 ", async () => {
    console.log(`Test 7`);

    const response = await apiClientUtils.sendRequest("get", "/users");
    const body = await response.json();
    expect(response.status()).toBe(200);
  });
  test("Test 8 ", async () => {
    console.log(`Test 8`);

    const response = await apiClientUtils.sendRequest("get", "/users");
    const body = await response.json();
    expect(response.status()).toBe(200);
  });
});
