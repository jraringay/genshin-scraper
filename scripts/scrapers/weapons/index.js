// Call the weapon scrapers from within the folder
const scrapeSwords = require("./scrapeSwords")
const scrapeClaymores = require("./scrapeClaymores");
const scrapePolearms = require("./scrapePolearms");
const scrapeBows = require("./scrapeBows").scrapeBows;
const scrapeBowsTwo = require("./scrapeBows").scrapeBowsTwo;
const scrapeCatalysts = require("./scrapeCatalysts");

module.exports = {
  scrapeSwords,
  scrapeClaymores,
  scrapePolearms,
  scrapeBows,
  scrapeBowsTwo,
  scrapeCatalysts
}