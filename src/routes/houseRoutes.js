// ##############################################################
// REQUIRE MODULES
// ##############################################################
const express = require("express");
const houseController = require("../controllers/houseController.js");
const userController = require("../controllers/userController.js");
const jwtMiddleware = require("../middlewares/jwtMiddleware");

// ##############################################################
// CREATE ROUTER
// ##############################################################
const router = express.Router();

// ##############################################################
// DEFINE ROUTES
// ##############################################################

// Section B Task 16 (Retrieve all Hogwarts houses)
router.get("/allHouses", houseController.getAllHouses);

// Section B Task 17 (Allow user to choose their Hogwarts house)
router.post(
  "/chooseHouse",
  jwtMiddleware.verifyToken,
  userController.checkUserById, // Ensure user exists
  houseController.checkIfAlreadySorted, // Check if the user is already sorted
  houseController.assignUserToHouse, // Assign user to a house
  houseController.getUserAssignedHouse // Fetch and return the house name
);

// Section B Task 18 (Retrieve user's house by userId)
router.get("/userHouse",
  jwtMiddleware.verifyToken,
  userController.checkUserById, // Ensure user exists
  houseController.getUserHouse // Get user's house details
);

// ##############################################################
// EXPORT ROUTER
// ##############################################################
module.exports = router;
