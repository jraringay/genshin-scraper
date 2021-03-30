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
  weaponPrimary,
  weaponSecondary
} = require("../controller/ascensionMats")

const {
  charExp,
  weaponExp
} = require("../controller/experienceMats")

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
router.get("/weapon-ascension/secondary", weaponSecondary);

// Experience Materials Routes
router.get("/character-exp", charExp);
router.get("/weapon-exp", weaponExp);

module.exports = router;
