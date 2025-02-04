const Assertions = {
    statusCode: (response, expectedCode) => {
      expect(response.status()).toBe(expectedCode);
    },
  
    responseBodyContains: async (response, expectedKey, actualValue) => {
      const body = await response.json();
      expect(body).toHaveProperty(expectedKey, actualValue);
    },
  };
  
module.exports = Assertions