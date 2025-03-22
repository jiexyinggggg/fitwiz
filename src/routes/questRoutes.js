// ##############################################################
// REQUIRE MODULES
// ##############################################################
const express = require("express");
const questController = require("../controllers/questController.js");
const userController = require("../controllers/userController.js");
const jwtMiddleware = require("../middlewares/jwtMiddleware");

// ##############################################################
// CREATE ROUTER
// ##############################################################
const router = express.Router();

// ##############################################################
// DEFINE ROUTES
// ##############################################################

// Section B Task 26 (Retrieve all quests)
router.get("/", questController.getAllQuests);

// Section B Task 27 (Start a quest by providing questId and userId)
router.post(
  "/start/:questId/:userId",
  jwtMiddleware.verifyToken,
  userController.checkUserById, // Ensure user exists
  questController.checkQuestExistence, // Validate the existence of the quest
  questController.checkQuestAvailability, // Ensure the quest is not already in progress
  questController.startQuest, // Mark the quest as started for the user
  questController.displayQuestInfo // Display quest information to the user
);

// Section B Task 28 (Complete a quest by providing questId and userId)
router.post(
  "/:questId/:userId",
  jwtMiddleware.verifyToken,
  userController.checkUserById, // Validate the existence of the user
  questController.validateQuestId, // Ensure the provided questId is valid
  questController.addUserCompletion, // Mark the quest as completed for the user
  questController.fetchQuestRewardPoints, // Retrieve reward points for the quest
  questController.addQuestRewardPoints // Add the reward points to the user's total
);

// Section B Task 29 (Retrieve quest completion)
router.get("/questCompletion", questController.getAllQuestCompletion);

// Section B Task 30 (Retrieve quest completion by providing userId)
router.get(
  "/:user_id",
  jwtMiddleware.verifyToken,
  userController.checkUserById, // Ensure user exists
  questController.getQuestCompletionById // Retrieve quest completions by user_id
);

// ##############################################################
// EXPORT ROUTER
// ##############################################################
module.exports = router;