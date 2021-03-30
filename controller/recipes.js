// Call recipe scraper scripts
const {
  scrapeSmithing,
  scrapeAlchemy,
  scrapeCooking,
  scrapeProcessing
} = require("../scripts/scrapers/index").recipes;

module.exports = {

  smithing: async (_req, res) => {
    try {
      const result = await scrapeSmithing();
      console.log(result.length);
      res.json(result);
    } catch (error) {
      console.error(`ERROR: ${error.message}`);
    }
  },

  alchemy: async (_req, res) => {
    try {
      const result = await scrapeAlchemy();
      console.log(result.length);
      res.json(result);
    } catch (error) {
      console.error(`ERROR: ${error.message}`);
    }
  },

  cooking: async (_req, res) => {
    try {
      const result = await scrapeCooking();
      console.log(result.length);
      res.json(result);
    } catch (error) {
      console.error(`ERROR: ${error.message}`);
    }
  },

  processedFood: async (_req, res) => {
    try {
      const result = await scrapeProcessing();
      console.log(result.length);
      res.json(result);
    } catch (error) {
      console.error(`ERROR: ${error.message}`);
    }
  }
};