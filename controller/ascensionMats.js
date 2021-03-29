const {
  scrapeJewels,
  scrapeElemStones,
  scrapeLocalMats,
  scrapeCommonMats,
  scrapeTalentMats,
  scrapeWeaponPrimary
} = require("../scripts/scrapers/index").ascensionMats;

module.exports = {
  jewels: async (_req, res) => {
    try {
      const result = await scrapeJewels();
      console.log(result.length);
      res.json(result);
    } catch (error) {
      console.error(`ERROR: ${error.message}`);
    }
  },
  
  elemStones: async (_req, res) => {
    try {
      const result = await scrapeElemStones();
      console.log(result.length);
      res.json(result);
    } catch (error) {
      console.error(`ERROR: ${error.message}`);
    }
  },

  localMats: async (_req, res) => {
    try {
      const result = await scrapeLocalMats();
      console.log(result.length);
      res.json(result);
    } catch (error) {
      console.error(`ERROR: ${error.message}`);
    }
  },

  commonMats: async (_req, res) => {
    try {
      const result = await scrapeCommonMats();
      console.log(result.length);
      res.json(result);
    } catch (error) {
      console.error(`ERROR: ${error.message}`);
    }
  },

  talentMats: async (_req, res) => {
    try {
      const result = await scrapeTalentMats();
      console.log(result.length);
      res.json(result);
    } catch (error) {
      console.error(`ERROR: ${error.message}`);
    }
  },

  weaponPrimary: async (_req, res) => {
    try {
      const result = await scrapeWeaponPrimary();
      console.log(result.length);
      res.json(result);
    } catch (error) {
      console.error(`ERROR: ${error.message}`);
    }
  }
};