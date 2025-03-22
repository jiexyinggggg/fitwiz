// ##############################################################
// REQUIRE MODULES
// ##############################################################
const express = require("express");
const controller = require("../controllers/leaderboardController.js");

// ##############################################################
// CREATE ROUTER
// ##############################################################
const router = express.Router();

// ##############################################################
// DEFINE ROUTES
// ##############################################################

// Section B Task 19 (Retrieve the user leaderboard showing users ranked by skillpoints across all houses, filtered by house if requested)
router.get("/users", controller.getUserHouse, controller.getUserLeaderboard);

// Section B Task 20 (Retrieve the house leaderboard showing houses ranked by cumulative skillpoints)
router.get("/houses", controller.getHouseLeaderboard);

// ##############################################################
// EXPORT ROUTER
// ##############################################################
module.exports = router;