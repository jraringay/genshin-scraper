// Call the scrapers from their respective indexes inside their folders
const weapons = require("./weapons/index");
const characters = require("./characters/index");
const artifactSets = require("./artifacts/index");
const consumables = require("./consumables/index");
const ascensionMats = require("./ascensionMats/index");
const experienceMats = require("./experienceMats/index")
const recipes = require("./recipes/index")

module.exports = {
  weapons,
  characters,
  artifactSets,
  consumables,
  ascensionMats,
  experienceMats,
  recipes
}