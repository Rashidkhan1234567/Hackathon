const express = require("express");
const app = require("./app");
const config = require("../src/configs/config");
const connectDB = require("../src/configs/db");
const path = require("path");

// Add server start timestamp
const serverStartTime = Date.now();

connectDB();

app.get("/", (req, res) => {
  // Pass the start time to the frontend by adding it to index.html content
  const htmlContent = require('fs').readFileSync(path.join(__dirname, 'index.html'), 'utf8')
    .replace('SERVER_START_TIME', serverStartTime.toString());
  res.send(htmlContent);
});

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});
