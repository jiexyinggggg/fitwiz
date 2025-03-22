// ##############################################################
// REQUIRE MODULES
// ##############################################################
const express = require("express");
const challengesController = require("../controllers/challengesController");
const userController = require("../controllers/userController.js");
const userCompletionController = require("../controllers/userCompletionController");
const jwtMiddleware = require("../middlewares/jwtMiddleware");

// ##############################################################
// CREATE ROUTER
// ##############################################################
const router = express.Router();

// ##############################################################
// DEFINE ROUTES
// ##############################################################

// Section A Task 9 (Retrieve list of users who attempted a particular challenge by providing its challenge_id)
router.get("/:challenge_id", userCompletionController.selectUserCompleted);

// Section A Task 8 (Create an completion record (marking a challenge complete) from a user by providing challenge_id in URL parameter and user_id, completed, creation_date, and notes in the request body)
router.post(
  "/complete",
  jwtMiddleware.verifyToken,
  challengesController.validateChallengeId, // Validate if challenge_id exists
  userController.checkUserById, // Ensure the user exists
  userCompletionController.addUserCompletion, // Add user completion record
  userController.addUserSkillpoints // Add skillpoints for user as reward
);

// Section A Task 7 (Delete a challenge by providing its challenge_id and its associated user completions (if any))
router.delete(
  "/:challenge_id",
  jwtMiddleware.verifyToken,
  challengesController.deleteChallenge, // Delete challenge
  challengesController.deleteRemovedChallengeUserCompletions // Delete deleted challenge's responses made by users
);

// Section A Task 6 (Update challenge details by providing challenge_id in the URL and updating the fitness challenge in the request body)
router.put(
  "/:challenge_id",
  jwtMiddleware.verifyToken,
  userController.checkUserById, // Ensure the user exists
  challengesController.checkChallengeById, // Verify if challenge_id exists
  challengesController.checkUserIdAgainstCreatorId, // Verify if user is the creator of referenced challenge
  challengesController.updateChallenge // Update challenge
);

// Section A Task 4 (Create a new challenge by providing user_id, challenge and skillpoints in the request body)
router.post(
  "/",
  jwtMiddleware.verifyToken,
  userController.checkUserById, // Ensure the user exists
  challengesController.createNewChallenge // Create new challenge
);

// Section A Task 5 (Retrieve a list of all challenges with their respective challenge_id, challenge, creator_id and skillpoints)
router.get("/", challengesController.readAllChallenges); // Retrieve list of all challenges available

// ##############################################################
// EXPORT ROUTER
// ##############################################################
module.exports = router;