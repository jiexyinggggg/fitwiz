// ##############################################################
// REQUIRE MODULES
// ##############################################################
const express = require("express");
const duelController = require("../controllers/duelController");
const userController = require("../controllers/userController");
const jwtMiddleware = require("../middlewares/jwtMiddleware");

// ##############################################################
// CREATE ROUTER
// ##############################################################
const router = express.Router();

// ##############################################################
// DEFINE ROUTES
// ##############################################################

// Section B Task 11 (Retrieve all creatures)
router.get("/creatures", duelController.readAllCreatures);

// Section B Task 12 (Start a duel by checking prerequisites and initiating the duel)
router.post(
  "/start",
  jwtMiddleware.verifyToken,
  duelController.checkDuplicateDuel, // Check if there's an ongoing duel
  duelController.checkUserEligibility, // Verify user has required items and skillpoints
  duelController.deductInitialSkillpoints, // Deduct initial skillpoints
  duelController.readCreatureHealth, // Retrieve creature's health
  duelController.createDuelRecord, // Create an initial duel record
);

// Section B Task 13 (Attack during a duel by calculating damage and updating outcomes)
router.post("/attack",
  jwtMiddleware.verifyToken,
  duelController.readDuelById, // Retrieve duel details by duelId
  duelController.readDamageItemId, // Retrieve damage item IDs (potion/spell) from user's vault
  duelController.readDamageValuePotion, // Retrieve potion damage and heal values
  duelController.readDamageValueSpell, // Retrieve spell damage value
  duelController.fetchDuelRewardPoints, // Retrieve duel reward points
  duelController.simulateDuelAndUpdateOutcome, // Simulate the duel and update the outcome
  duelController.addDuelRewardPoints, // Add the reward points to the user's total
  userController.updateUserHealth // Update user's health in the database
)

// Section B Task 14 (Retrieve a list of all duels)
router.get("/", duelController.getAllDuels);

// Section B Task 15 (Retrieve duel details by providing duelId)
router.get("/:duelId", duelController.getDuelDetails);

// ##############################################################
// EXPORT ROUTER
// ##############################################################
module.exports = router;