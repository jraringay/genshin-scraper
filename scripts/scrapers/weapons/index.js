// Call the weapon scrapers from within the folder
const scrapeSwords = require("./scrapeSwords").scrapeSwords;
const scrapeSwordsTwo = require("./scrapeSwords").scrapeSwordsTwo;
const scrapeClaymores = require("./scrapeClaymores").scrapeClaymores;
const scrapeClaymoresTwo = require("./scrapeClaymores").scrapeClaymoresTwo;
const scrapePolearms = require("./scrapePolearms").scrapePolearms;
const scrapePolearmsTwo = require("./scrapePolearms").scrapePolearmsTwo;
const scrapeBows = require("./scrapeBows").scrapeBows;
const scrapeBowsTwo = require("./scrapeBows").scrapeBowsTwo;
const scrapeCatalysts = require("./scrapeCatalysts").scrapeCatalysts;
const scrapeCatalystsTwo = require("./scrapeCatalysts").scrapeCatalystsTwo;

module.exports = {
  scrapeSwords,
  scrapeSwordsTwo,
  scrapeClaymores,
  scrapeClaymoresTwo,
  scrapePolearms,
  scrapePolearmsTwo,
  scrapeBows,
  scrapeBowsTwo,
  scrapeCatalysts,
  scrapeCatalystsTwo
}