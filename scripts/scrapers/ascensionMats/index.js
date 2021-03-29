// Call character scrapers
const scrapeJewels = require("./scrapeJewels");
const scrapeElemStones = require("./scrapeElemStones");
const scrapeLocalMats = require("./scrapeLocalMats");
const scrapeCommonMats = require("./scrapeCommonMats");
const scrapeTalentMats = require("./scrapeTalentMats");
const scrapeWeaponPrimary = require("./scrapeWeaponPrimary");

module.exports = {
  scrapeJewels,
  scrapeElemStones,
  scrapeLocalMats,
  scrapeCommonMats,
  scrapeTalentMats,
  scrapeWeaponPrimary
}