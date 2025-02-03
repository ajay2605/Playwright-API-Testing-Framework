npm install jest-json-schema

<!-- import jest and the schema file -->

const userResponseSchema = require("./users.schema.json");
const { matchersWithOptions } = require("jest-json-schema");

<!-- Add these lines -->

expect.extend(
matchersWithOptions({
schemas: [require("./users.schema.json")], // Path to your schema file
})
);

<!-- Assertions -->

expect(responseBody).toMatchSchema(userResponseSchema);
