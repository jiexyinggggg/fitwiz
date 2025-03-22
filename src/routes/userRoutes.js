// ##############################################################
// REQUIRE MODULES
// ##############################################################
const express = require("express");
const controller = require("../controllers/userController");
const jwtMiddleware = require("../middlewares/jwtMiddleware");

// ##############################################################
// CREATE ROUTER
// ##############################################################
const router = express.Router();

// ##############################################################
// DEFINE ROUTES
// ##############################################################

// Section B Task 31 (Retrieve activity history for a user)
router.get("/userActivityHistory",
  jwtMiddleware.verifyToken,
  controller.checkUserById, // Ensure the user exists
  controller.getUserActivityHistory // Fetch user activity history
);

// Section B Task 32 (Retrieve user details by providing user_id)
router.get(
  "/", 
  jwtMiddleware.verifyToken,
  controller.checkUserById
);

// Section A Task 3 (Update user details by providing user_id in the URL and updated username in the request body)
router.put(
  "/:user_id",
  jwtMiddleware.verifyToken,
  controller.checkUserById, // Ensure the user exists
  controller.checkUsername, // Verify if username has already been used before by another user
  controller.updateUserById // Update user details
);

// Section A Task 1 (Create a new user by specifying the new user's username in the request body)
router.post("/", 
  jwtMiddleware.verifyToken,
  controller.checkUsername, // Verify if username has already been used before by another user
  controller.createNewUser // Create new user
);

// Section A Task 2 (Retrieve a list of all users with their respective user_id, username, and skillpoints)
router.get(
  "/", 
  jwtMiddleware.verifyToken,
  controller.readAllUsers
);

// ##############################################################
// EXPORT ROUTER
// ##############################################################
module.exports = router;