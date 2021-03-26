// Call required packages
const express = require("express");
const morgan = require("morgan");
const { port } = require("./config");

// Call scraper script?
const scrapeSwords = require("./scrapeSwords");

// Set up application
const app = express();

// Monitor HTTP requests
app.use(morgan("dev"));


app.get("/", async (req, res) => {
  const result = await scrapeSwords();
  console.log(result.length);
  res.json(result);
});

// Run application
app.listen(port, () => {
  console.log(`listening to port ${port}`);
})
