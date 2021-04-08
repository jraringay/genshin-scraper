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
router.get("/swords", swords);
router.get("/swordsTwo", swordsTwo);
router.get("/claymores", claymores);
router.get("/claymoresTwo", claymoresTwo);
router.get("/polearms", polearms);
router.get("/polearmsTwo", polearmsTwo);
router.get("/bows", bows);
router.get("/bowsTwo", bowsTwo);
router.get("/catalysts", catalysts);
router.get("/catalystsTwo", catalystsTwo);

// Character Route
router.get("/characters", characters);
router.get("/charactersTwo", charactersTwo);

// Artifact Sets Route
router.get("/artifacts", artifactSets);
router.get("/artifactsTwo", artifactSetsTwo);

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

// Recipe Routes
router.get("/recipes/smithing", smithing);
router.get("/recipes/alchemy", alchemy);
router.get("/recipes/cooking", cooking);
router.get("/recipes/processing", processedFood);

module.exports = router;
