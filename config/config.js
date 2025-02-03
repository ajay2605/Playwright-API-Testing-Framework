// config.js
require("dotenv").config();

const environments = {
  dev: {
    baseUrl: process.env.DEV_BASE_URL,
    emailOrMobileNo: process.env.DEV_USERNAME,
    password: process.env.DEV_PASSWORD,
  },
  staging: {
    baseUrl: process.env.STAGING_BASE_URL,
    emailOrMobileNo: process.env.STAGING_USERNAME,
    password: process.env.STAGING_PASSWORD,
  },
  prod: {
    baseUrl: process.env.PROD_BASE_URL,
    emailOrMobileNo: process.env.PROD_USERNAME,
    password: process.env.PROD_PASSWORD,
  },
};

const env = process.env.ENVIRONMENT || "dev"; // Default to 'dev' if ENVIRONMENT is not set
module.exports = environments[env]; // Export the configuration for the chosen environment
