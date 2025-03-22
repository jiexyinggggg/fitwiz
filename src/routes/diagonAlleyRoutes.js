// ##############################################################
// REQUIRE MODULES
// ##############################################################
const express = require("express");
const controller = require("../controllers/diagonAlleyController.js");
const jwtMiddleware = require("../middlewares/jwtMiddleware");

// ##############################################################
// CREATE ROUTER
// ##############################################################
const router = express.Router();

// ##############################################################
// DEFINE ROUTES
// ##############################################################

// Section B Task 1 (Retrieve all wands available in the Wand Shop)
router.get("/wandShop", controller.getAllWandsInShop);

// Section B Task 2 (Purchase a wand by providing wandId and userId in the URL)
router.post(
  "/wandShop/purchase",
  jwtMiddleware.verifyToken,
  controller.validateWandPurchase, // Validation before purchase of wand
  controller.completeWandPurchase  // For completion of wand purchase
);

// Section B Task 3 (Retrieve all potions available in the Potion Shop)
router.get("/potionShop", controller.getAllPotionsInShop);

// Section B Task 4 (Purchase a potion by providing potionId and userId in the URL)
router.post(
  "/potionShop/purchase",
  jwtMiddleware.verifyToken,
  controller.validatePotionPurchase, // Validation before purchase of potion
  controller.completePotionPurchase  // For completion of potion purchase
);

// Section B Task 5 (Retrieve all spells available in the Spell Shop)
router.get("/spellShop", controller.getAllSpellsInShop);

// Section B Task 6 (Purchase a spell by providing spellId and userId in the URL)
router.post(
  "/spellShop/purchase",
  jwtMiddleware.verifyToken,
  controller.validateSpellPurchase, // Validation before purchase of spell
  controller.completeSpellPurchase  // For completion of spell purchase
);  

// ##############################################################
// EXPORT ROUTER
// ##############################################################
module.exports = router;