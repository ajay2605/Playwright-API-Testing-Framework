// utils/logger.js
const Logger = {
  log: (message) => {
    console.log(`[LOG] ${new Date().toISOString()} - ${message}`);
  },
  logResponse: async (response) => {
    try {
      const body = await response.json(); // Automatically parse the JSON
      console.log("[RESPONSE BODY]:", body); // This is printing properly than the below line
      // console.log("[RESPONSE BODY]:", JSON.stringify(body, null, 2));
    } catch (error) {
      console.log("[ERROR] - Failed to parse JSON response:", error);
    }
  },
  error: (message) => {
    console.log(`[ERROR] - ${message}`);
  },

  debug: (message) => {
    console.log(`[DEBUG] - ${message}`);
  },
};

module.exports = Logger;
