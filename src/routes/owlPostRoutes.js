// ##############################################################
// REQUIRE MODULES
// ##############################################################
const express = require("express");
const owlPostController = require("../controllers/owlPostController.js");
const userController = require("../controllers/userController.js");
const jwtMiddleware = require("../middlewares/jwtMiddleware");

// ##############################################################
// CREATE ROUTER
// ##############################################################
const router = express.Router();

// ##############################################################
// DEFINE ROUTES
// ##############################################################

// Section B Task 21 (Submit new review)
router.post("/", 
  jwtMiddleware.verifyToken,
  userController.checkUserById, // Ensure user exists
  owlPostController.submitReview // Submit review
);

// Section B Task 22 (Retrieve all review)
router.get("/", owlPostController.getAllReview);

// Section B Task 23 (Retrieve review for a specific user)
router.get("/", 
  jwtMiddleware.verifyToken,
  userController.checkUserById, // Ensure user exists
  owlPostController.getUserReview // Retrieve review for the user 
);

// Section B Task 24 (Update existing review)
router.put(
  "/",
  jwtMiddleware.verifyToken,
  userController.checkUserById, // Ensure user exists 
  owlPostController.checkReviewExistence, // Ensure review exists
  owlPostController.checkUserOwnership, // Ensure user owns the review
  owlPostController.updateReview // Update review
); 

// Section B Task 25 (Delete review)
router.delete(
  "/:reviewId", 
  jwtMiddleware.verifyToken,
  owlPostController.checkUserOwnership, // Ensure user owns the review
  owlPostController.deleteReview
);

// ##############################################################
// EXPORT ROUTER
// ##############################################################
module.exports = router;