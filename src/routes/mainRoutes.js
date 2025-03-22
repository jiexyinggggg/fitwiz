// ##############################################################
// REQUIRE MODULES
// ##############################################################
const express = require("express");
const userRoutes = require("./userRoutes.js");
const challengesRoutes = require("./challengesRoutes.js");
const diagonAlleyRoutes = require("./diagonAlleyRoutes.js");
const vaultRoutes = require("./vaultRoutes.js");
const duelRoutes = require("./duelRoutes.js");
const houseRoutes = require("./houseRoutes.js");
const leaderboardRoutes = require("./leaderboardRoutes.js");
const owlPostRoutes = require("./owlPostRoutes.js");
const questRoutes = require("./questRoutes.js");
const jwtMiddleware = require("../middlewares/jwtMiddleware");
const bcryptMiddleware = require("../middlewares/bcryptMiddleware");
const userController = require("../controllers/userController.js");
const verifyController = require("../controllers/verifyController");

// ##############################################################
// CREATE ROUTER
// ##############################################################
const router = express.Router();

// ##############################################################
// DEFINE ROUTES
// ##############################################################
router.post(
  "/login",
  userController.login,
  bcryptMiddleware.comparePassword,
  jwtMiddleware.generateToken,
  jwtMiddleware.sendToken
);

router.post("/register",
  userController.checkUsernameOrEmailExist,
  bcryptMiddleware.hashPassword,
  userController.register,
  jwtMiddleware.generateToken,
  jwtMiddleware.sendToken
);

router.post(
    "/jwt/verify",
    jwtMiddleware.verifyToken,
    verifyController.showTokenVerified
  );
  
// Route to generate a new token and send it back
router.post("/extend-session", jwtMiddleware.generateToken, jwtMiddleware.sendToken);
  
// Routes for user-related operations
router.use("/users", userRoutes);

// Routes for challenge-related operations
router.use("/challenges", challengesRoutes);

// Routes for shop-related operations
router.use("/diagonAlley", diagonAlleyRoutes);

// Routes for inventory-related operations
router.use("/vault", vaultRoutes);

// Routes for duelling-related operations
router.use("/duel", duelRoutes);

// Routes for house-related operations
router.use("/houses", houseRoutes);

// Routes for leaderboard-related operations
router.use("/leaderboard", leaderboardRoutes);

// Routes for review-related operations
router.use("/owlPost", owlPostRoutes);

// Routes for quest-related operations
router.use("/quests", questRoutes);

// ##############################################################
// EXPORT ROUTER
// ##############################################################
module.exports = router;