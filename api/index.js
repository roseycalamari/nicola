// This file helps Vercel recognize the API routes
module.exports = (req, res) => {
  // Import the main server.js file
  require('../server')(req, res);
}; 