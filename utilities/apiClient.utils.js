const { request } = require("@playwright/test");
const config = require("../config/config");
const Logger = require("./logger.utils");
const { generateAuthToken } = require("../resources/generateToken");

class ApiUtils {
  constructor() {
    this.baseUrl = config.baseUrl;
    // this.context = null;
  }

  async createContext() {
    this.context = await request.newContext();
    this.token = await generateAuthToken();
    return this;
  }

  async dispose() {
    if (this.context) {
      await this.context.dispose();
    }
  }

  async get(endpoint, headers = {}) {
    try {
      if (!this.context) throw new Error("API context not initialized.");
      const url = `${this.baseUrl}${endpoint}`;
      const requestHeaders = {
        ...headers,
        Authorization: this.token,
      };

      const response = await this.context.get(url, {
        headers: requestHeaders,
      });
      return response;
    } catch (error) {
      Logger.error(`GET request to ${endpoint} failed: ${error.message}`);
      throw error; // Re-throw error for further handling if needed
    }
  }

  async post(endpoint, data, headers = {}) {
    try {
      if (!this.context) throw new Error("API context not initialized.");
      const url = `${this.baseUrl}${endpoint}`;
      const requestHeaders = {
        ...headers,
        Authorization: this.token,
      };
      const response = await this.context.post(url, {
        data,
        headers: requestHeaders,
      });
      return response;
    } catch (error) {
      console.error(`POST request to ${endpoint} failed:`, error);
      throw error;
    }
  }

  async delete(endpoint, headers = {}) {
    try {
      if (!this.context) throw new Error("API context not initialized.");
      const url = `${this.baseUrl}${endpoint}`;
      const requestHeaders = {
        ...headers,
        Authorization: this.token,
      };
      const response = await this.context.delete(url, {
        headers: requestHeaders,
      });
      return response;
    } catch (error) {
      console.error(`Delete request to ${endpoint} failed:`, error);
      throw error;
    }
  }
}

module.exports = new ApiUtils();
