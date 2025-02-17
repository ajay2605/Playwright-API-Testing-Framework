const { faker } = require("@faker-js/faker");

function generateUser({
  firstName = undefined, // Use `undefined` as default instead of `null`
  lastName = undefined,
  email = undefined,
  password = undefined,
  mobileNumber = undefined,
  otp = undefined,
} = {}) {
  return {
    firstName: firstName !== undefined ? firstName : faker.person.firstName(),
    lastName: lastName !== undefined ? lastName : faker.person.lastName(),
    email: email !== undefined ? email : faker.internet.email(),
    password: password !== undefined ? password : faker.internet.password(),
    mobileNumber:
      mobileNumber !== undefined ? mobileNumber : faker.phone.number(),
    otp: otp !== undefined ? otp : faker.string.numeric(6), // Generates a 6-digit OTP
  };
}

module.exports = generateUser;

// generateUser() ---------- All random but fast, because no object initialization
// {} (Empty)	-------------- All random
// { firstName: null }	--------- firstName: null, others random
// { email: "test@example.com" }	----- email set, others random
// { lastName: "" }	-------- lastName: "", others random
// { lastName: @#@$!#$@#!# }	-------- lastName: @#@$!#$@#!#, others random
