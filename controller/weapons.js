// Call weapon scraper scripts
const {
  scrapeSwords,
  scrapeClaymores,
  scrapePolearms,
  scrapeBows,
  scrapeCatalysts
} = require("../scripts/scrapers/index").weapons;

module.exports = {

  swords: async (_req, res) => {
    try {
      const result = await scrapeSwords();
      console.log(result.length);
      res.json(result);
    } catch (error) {
      console.error(`ERROR: ${error.message}`);
    }
  },

  claymores: async (_req, res) => {
    try {
      const result = await scrapeClaymores();
      console.log(result.length);
      res.json(result);
    } catch (error) {
      console.error(`ERROR: ${error.message}`);
    }
  },

  polearms: async (_req, res) => {
    try {
      const result = await scrapePolearms();
      console.log(result.length);
      res.json(result);
    } catch (error) {
      console.error(`ERROR: ${error.message}`);
    }
  },

  bows: async (_req, res) => {
    try {
      const result = await scrapeBows();
      console.log(result.length);
      res.json(result);
    } catch (error) {
      console.error(`ERROR: ${error.message}`);
    }
  },

  catalysts: async (_req, res) => {
    try {
      const result = await scrapeCatalysts();
      console.log(result.length);
      res.json(result);
    } catch (error) {
      console.error(`ERROR: ${error.message}`);
    }
  }
};