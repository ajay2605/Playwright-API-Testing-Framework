const { faker } = require("@faker-js/faker");

function generateProduct({
  name = undefined,
  description = undefined,
  price = undefined,
} = {}) {
  return {
    name: name != undefined ? name : faker.person.fullName(),
    description: description != undefined ? description : faker.lorem.words(8),
    price:
      price != undefined ? price : faker.number.int({ min: 100, max: 999 }),
  };
}

module.exports = generateProduct;
