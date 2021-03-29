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
  talentMats,
  weaponPrimary
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
router.get("/character-ascension/jewels", jewels);
router.get("/character-ascension/elemstones", elemStones);
router.get("/character-ascension/localmats", localMats);
router.get("/character-ascension/commonmats", commonMats);
router.get("/talent-ascension", talentMats);
router.get("/weapon-ascension/primary", weaponPrimary);

module.exports = router;
