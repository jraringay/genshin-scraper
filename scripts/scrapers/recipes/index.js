// Call artifact set scrapers
const scrapeSmithing = require("./scrapeSmithing");
const scrapeAlchemy = require("./scrapeAlchemy");
const scrapeCooking = require("./scrapeCooking");
const scrapeProcessedFood = require("./scrapeProcessedFood");

module.exports = {
  scrapeSmithing,
  scrapeAlchemy,
  scrapeCooking,
  scrapeProcessedFood
}