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
  jewels,
  elemStones,
  localMats,
  commonMats,
  talentMats
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
router.get("/elemstones", elemStones);
router.get("/localmats", localMats);
router.get("/commonmats", commonMats);
router.get("/talentmats", talentMats);

module.exports = router;
