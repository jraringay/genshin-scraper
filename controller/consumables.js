// Call weapon scraper scripts
const {
  scrapeFood,
  scrapeIngredients,
  scrapePotions
} = require("../scripts/scrapers/index").consumables;

module.exports = {

  food: async (_req, res) => {
    try {
      const result = await scrapeFood();
      console.log(result.length);
      res.json(result);
    } catch (error) {
      console.error(`ERROR: ${error.message}`);
    }
  },

  ingredients: async (_req, res) => {
    try {
      const result = await scrapeIngredients();
      console.log(result.length);
      res.json(result);
    } catch (error) {
      console.error(`ERROR: ${error.message}`);
    }
  },

  potions: async (_req, res) => {
    try {
      const result = await scrapePotions();
      console.log(result.length);
      res.json(result);
    } catch (error) {
      console.error(`ERROR: ${error.message}`);
    }
  }
};