// Call the scrapers from their respective indexes inside their folders
const weapons = require("./weapons/index");
const characters = require("./characters/index");
const artifactSets = require("./artifacts/index");

module.exports = {
  weapons,
  characters,
  artifactSets
}