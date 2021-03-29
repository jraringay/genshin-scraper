const router = require("express").Router();
const {
  swords,
  claymores,
  polearms,
  bows,
  catalysts,
} = require("../controller/weapons");

const {
  characters,
} = require("../controller/characters");

const {
  artifactSets,
} = require("../controller/artifactSets");

const {
  food,
  ingredients,
  potions
} = require("../controller/consumables");

const {
  jewels
} = require("../controller/ascensionMats")

// Weapon Routes
router.get("/swords", swords);
router.get("/claymores", claymores);
router.get("/polearms", polearms);
router.get("/bows", bows);
router.get("/catalysts", catalysts);

// Character Route
router.get("/characters", characters);

// Artifact Sets Route
router.get("/artifacts", artifactSets);

// Consumable Routes
router.get("/food", food);
router.get("/ingredients", ingredients);
router.get("/potions", potions);

// Ascension Materials Routes
router.get("/jewels", jewels);

module.exports = router;
