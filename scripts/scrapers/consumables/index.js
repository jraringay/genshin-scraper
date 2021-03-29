// Call artifact set scrapers
const scrapeFood = require("./scrapeFood");
const scrapeIngredients = require("./scrapeIngredients");
const scrapePotions = require("./scrapePotions");

module.exports = {
  scrapeFood,
  scrapeIngredients,
  scrapePotions
}