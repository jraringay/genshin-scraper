// Call character scraper scripts
const {
  scrapeCharacters,
  scrapeCharactersTwo
} = require("../scripts/scrapers/index").characters;

module.exports = {
  characters: async (_req, res) => {
    try {
      const result = await scrapeCharacters();
      console.log(result.length);
      res.json(result);
    } catch (error) {
      console.error(`ERROR: ${error.message}`);
    }
  },
  charactersTwo: async (_req, res) => {
    try {
      const result = await scrapeCharactersTwo();
      // console.log(result.length);
      res.json(result);
    } catch (error) {
      console.error(`ERROR: ${error.message}`);
    }
  },

};