// Call required packages
const express = require("express");
const morgan = require("morgan");
const { port } = require("./config");

// Set up application
const app = express();

// Monitor HTTP requests
app.use(morgan("dev"));

// Use routes
app.use('', require("./routes"));

// Run application
app.listen(port, () => {
  console.log(`listening to port ${port}`);
})
