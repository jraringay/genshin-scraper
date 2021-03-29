// Call character scrapers
const scrapeJewels = require("./scrapeJewels");
const scrapeElemStones = require("./scrapeElemStones");
const scrapeLocalMats = require("./scrapeLocalMats");
const scrapeCommonMats = require("./scrapeCommonMats");
const scrapeTalentMats = require("./scrapeTalentMats");

module.exports = {
  scrapeJewels,
  scrapeElemStones,
  scrapeLocalMats,
  scrapeCommonMats,
  scrapeTalentMats
}