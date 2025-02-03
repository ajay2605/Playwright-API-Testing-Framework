// generateToken.js
const { request } = require("@playwright/test");
const config = require("../config/config");

async function generateAuthToken() {
  // console.log("Config: ", config); // Add this line to debug
  const { baseUrl, emailOrMobileNo, password } = config; // Get values based on environment

  const context = await request.newContext();

  const response = await context.post(`${baseUrl}/users/login-with-password`, {
    data: {
      emailOrMobileNo: emailOrMobileNo,
      password: password,
    },
    headers: {
      "Content-Type": "application/json",
    },
  });

  const jsonResponse = await response.json();
  return `Bearer ${jsonResponse.token}`; // Ensure it returns a string with "Bearer "
}

module.exports = { generateAuthToken };
