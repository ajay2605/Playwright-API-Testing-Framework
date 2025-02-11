"scripts": {
"test": "rm -rf allure-results && npx playwright test",
"test:smoke": "npm run test -- --grep @smoke",
"test:regression": "npm run test -- --grep @regression",
"test:write": "npm run test -- --grep @write",
"test:read": "npm run test -- --grep @read",
"test:user": "npm run test -- --grep @user",
"test:combination": "npm run test -- --grep '@smoke|@regression'",
"report": "allure serve allure-results"
}

1. test.only - Runs only one test
2. test - to skip tests
3. test.fixme - PW wont run this test.It is just to tell that this needs fixing
4. Conditional Skipping

   test('skip this test', async ({ page, browserName }) => {
   test(browserName === 'firefox', 'Still working on it');
   });

5. Run all other tests expect fast
   npx playwright test --grep-invert @fast

6. Annotate Tests

test('test login page', {
annotation: {
type: 'issue',
description: 'https://github.com/microsoft/playwright/issues/23180',
},
}, async ({ page }) => {
// ...
});

7. Run only one describe tests
   test.describe.only

8. Add Smoke and Regression

test(
"should authenticate with valid credentials",
{
tag: ["@Smoke", "@Regression", "@Performance"],
},
async () => {
const response = await apiUtils.get("/users");
// Logger.logResponse(response);
expect(response).toBeTruthy();
expect(response.status()).toBe(200);
}
);
