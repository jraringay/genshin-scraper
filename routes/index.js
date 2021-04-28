const router = require("express").Router();
const {
  swords,
  claymores,
  polearms,
  bows,
  catalysts,
  bowsTwo,
  catalystsTwo,
  claymoresTwo,
  polearmsTwo,
  swordsTwo
} = require("../controller/weapons");

const {
  characters,
  charactersTwo
} = require("../controller/characters");

const {
  artifactSets,
  artifactSetsTwo
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
} = require("../controller/ascensionMats");

const {
  charExp,
  weaponExp
} = require("../controller/experienceMats");

const {
  smithing,
  alchemy,
  cooking,
  processedFood
} = require("../controller/recipes");

// Root
router.get("/", function (req, res) {
  res.send(router.stack.map(function (item) {
    return `<a href="${item.route.path}">${item.route.path}</a><br>`;
  }).join(""))
});

// Weapon Routes
router.get("/sword-url", swords);
router.get("/swords", swordsTwo);
router.get("/claymore-url", claymores);
router.get("/claymores", claymoresTwo);
router.get("/polearm-url", polearms);
router.get("/polearms", polearmsTwo);
router.get("/bow-url", bows);
router.get("/bows", bowsTwo);
router.get("/catalyst-url", catalysts);
router.get("/catalysts", catalystsTwo);

// Character Route
router.get("/character-url", characters);
router.get("/characters", charactersTwo);

// Artifact Sets Route
router.get("/artifact-url", artifactSets);
router.get("/artifacts", artifactSetsTwo);

// Consumable Routes
router.get("/food-url", food);
router.get("/ingredient-url", ingredients);
router.get("/potion-url", potions);

// Ascension Materials Routes
router.get("/character-ascension/jewel-url", jewels);
router.get("/character-ascension/elemstone-url", elemStones);
router.get("/character-ascension/localmats-url", localMats);
router.get("/character-ascension/commonmats-url", commonMats);
router.get("/talent-ascension-url", talentMats);
router.get("/weapon-ascension/primary-url", weaponPrimary);
router.get("/weapon-ascension/secondary-url", weaponSecondary);

// Experience Materials Routes
router.get("/character-exp-url", charExp);
router.get("/weapon-exp-url", weaponExp);

// Recipe Routes
router.get("/recipes/smithing-url", smithing);
router.get("/recipes/alchemy-url", alchemy);
router.get("/recipes/cooking-url", cooking);
router.get("/recipes/processing-url", processedFood);

module.exports = router;
