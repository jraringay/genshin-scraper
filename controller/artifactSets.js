// Call artifact set scraper scripts
const {
  scrapeArtifactSets
} = require("../scripts/scrapers/index").artifactSets;

module.exports = {
  artifactSets: async (_req, res) => {
    try {
      const result = await scrapeArtifactSets();
      console.log(result.length);
      res.json(result);
    } catch (error) {
      console.error(`ERROR: ${error.message}`);
    }
  },

};