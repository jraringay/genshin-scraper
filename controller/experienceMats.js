// Call experience material scraper scripts
const {
  scrapeCharExp,
  scrapeWeaponExp
} = require("../scripts/scrapers/index").experienceMats;

module.exports = {

  charExp: async (_req, res) => {
    try {
      const result = await scrapeCharExp();
      console.log(result.length);
      res.json(result);
    } catch (error) {
      console.error(`ERROR: ${error.message}`);
    }
  },

  weaponExp: async (_req, res) => {
    try {
      const result = await scrapeWeaponExp();
      console.log(result.length);
      res.json(result);
    } catch (error) {
      console.error(`ERROR: ${error.message}`);
    }
  }
};