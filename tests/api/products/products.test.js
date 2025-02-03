const { test, expect } = require("@playwright/test");
const apiClientUtils = require("../../../utilities/apiClient.utils");
const Logger = require("../../../utilities/logger.utils");
const generateProduct = require("./products.data");

test.describe.only("Products API Tests", () => {
  let productId;
  test.beforeAll(async () => {
    await apiClientUtils.createContext();
  });
  test.afterEach(async () => {
    if (productId) {
      await apiClientUtils.delete(`/products/${productId}`);
    }
  });
  test.afterAll(async () => {
    await apiClientUtils.dispose();
  });

  test("Verify if user can get all products", async () => {
    const response = await apiClientUtils.get("/products");
    await Logger.logResponse(response);

    const responseBody = await response.json();

    expect(response.status()).toBe(200);
    expect(responseBody).toHaveProperty(
      "message",
      "Products retireved successfully"
    );
  });

  test("Verify if user can create a product", async () => {
    const testProduct = generateProduct({});
    console.log(testProduct);
    const response = await apiClientUtils.post("/products", testProduct);
    const responseBody = await response.json();
    productId = responseBody.data._id;
    Logger.logResponse(response);

    expect(response.status()).toBe(201);
    expect(responseBody).toHaveProperty(
      "message",
      "Product created successfully"
    );
    expect(responseBody.data).toHaveProperty("name", testProduct.name);
    expect(responseBody.data).toHaveProperty(
      "description",
      testProduct.description
    );
    expect(responseBody.data).toHaveProperty("price", testProduct.price);
  });
});
