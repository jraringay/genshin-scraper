// Call required packages
const express = require("express");
const morgan = require("morgan");
const { port } = require("./config");

// Call weapon scrapers
const scrapeSwords = require("./scripts/weapons/scrapeSwords");
const scrapeClaymores = require("./scripts/weapons/scrapeClaymores");
const scrapePolearms = require("./scripts/weapons/scrapePolearms");
const scrapeBows = require("./scripts/weapons/scrapeBows");
const scrapeCatalysts = require("./scripts/weapons/scrapeCatalysts");

// Call character scraper
const scrapeCharacters = require("./scrapeCharacters");

// Set up application
const app = express();

// Monitor HTTP requests
app.use(morgan("dev"));


app.get("/swords", async (req, res) => {
  const result = await scrapeSwords();
  console.log(result.length);
  res.json(result);
});

app.get("/claymores", async (req, res) => {
  const result = await scrapeClaymores();
  console.log(result.length);
  res.json(result);
});

app.get("/polearms", async (req, res) => {
  const result = await scrapePolearms();
  console.log(result.length);
  res.json(result);
});

app.get("/bows", async (req, res) => {
  const result = await scrapeBows();
  console.log(result.length);
  res.json(result);
});

app.get("/catalysts", async (req, res) => {
  const result = await scrapeCatalysts();
  console.log(result.length);
  res.json(result);
});

app.get("/characters", async (req, res) => {
  const result = await scrapeCharacters();
  console.log(result.length);
  res.json(result);
});

// Run application
app.listen(port, () => {
  console.log(`listening to port ${port}`);
})
