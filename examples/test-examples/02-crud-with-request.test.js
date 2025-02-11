const { test, expect } = require("@playwright/test");
const { request } = require("@playwright/test");
const apiClientUtils = require("../../utilities/apiClient.utils");

test("Verify if we can get all users", async ({ request }) => {
  const response = await request.get("http://localhost:8085/users");
  const body = await response.json();
  console.log(body);

  expect(response.status()).toBe(200);
});

test("Verify post request", async ({ request }) => {
  const response = await request.post("http://localhost:8085/users/register", {
    data: {
      firstName: "TestUser",
      lastName: "2",
      email: "user2@test.com",
      password: "Test@123",
      mobileNumber: "0987656789",
      otp: "",
    },
    headers: {
      "content-type": "application/json",
    },
  });

  const body = await response.json();
  const createdUserId = body.data._id;

  const deleteResponse = await request.delete(
    `http://localhost:8085/users/${createdUserId}`
  );
  const deleteResponseBody = await deleteResponse.json();
  console.log(deleteResponseBody);
});

test("Verify Put Request", async ({ request }) => {
  const response = await request.post("http://localhost:8085/users/register", {
    data: {
      firstName: "TestUser",
      lastName: "2",
      email: "user2@test.com",
      password: "Test@123",
      mobileNumber: "0987656789",
      otp: "",
    },
    headers: {
      "content-type": "application/json",
    },
  });

  const body = await response.json();
  const createdUserId = body.data._id;

  const updatedResponse = await request.put(
    `http://localhost:8085/users/${createdUserId}`,
    {
      data: {
        firstName: "TestUser-Updated",
        lastName: "2",
        email: "user2@test.com",
        password: "Test@123",
        mobileNumber: "0987656789",
        otp: "",
      },
      headers: {
        "content-type": "application/json",
      },
    }
  );
  const updatedResponseBody = await updatedResponse.json();
  console.log(updatedResponseBody);

  const deleteResponse = await request.delete(
    `http://localhost:8085/users/${createdUserId}`
  );
  const deleteResponseBody = await deleteResponse.json();
  console.log(deleteResponseBody);
});

