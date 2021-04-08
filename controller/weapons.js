// Call weapon scraper scripts
const {
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

  swordsTwo: async (_req, res) => {
    try {
      const result = await scrapeSwordsTwo();
      // console.log(result.length);
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

  claymoresTwo: async (_req, res) => {
    try {
      const result = await scrapeClaymoresTwo();
      // console.log(result.length);
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
  
  polearmsTwo: async (_req, res) => {
    try {
      const result = await scrapePolearmsTwo();
      // console.log(result.length);
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

  bowsTwo: async (_req, res) => {
    try {
      const result = await scrapeBowsTwo();
      // console.log(result.length);
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
  },

  catalystsTwo: async (_req, res) => {
    try {
      const result = await scrapeCatalystsTwo();
      // console.log(result.length);
      res.json(result);
    } catch (error) {
      console.error(`ERROR: ${error.message}`);
    }
  }

};