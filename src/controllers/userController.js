// ##############################################################
// REQUIRE MODULES
// ##############################################################
const model = require("../models/userModel.js");

// ###################################################
// CONTROLLER FOR LOGIN
// ###################################################
module.exports.login = (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400).json({
      message: "Username or password not provided!",
    });
    return;
  }

  const data = {
    username: username,
    password: password,
  };

  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error login:", error);
      res.status(500).json(error);
    } else {
      if (results.length == 0) {
        res.status(404).json({
          message: "User not found!",
        });
      } else {
        res.locals.user_id = results[0].user_id;
        res.locals.hash = results[0].password;
        res.locals.user = results[0][2];
        next();
      }
    }
  };

  model.login(data, callback);
};

// ###################################################
// CONTROLLER FOR REGISTER
// ###################################################
module.exports.register = (req, res, next) => {
  const data = {
    username: res.locals.username,
    email: res.locals.email,
    password: res.locals.hash,
  };

  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error register:", error);
      res.status(500).json(error);
    } else {
      res.locals.user_id = results.insertId;
      res.locals.message = `User ${res.locals.username} created successfully.`;
      next();
    }
  };

  model.register(data, callback);
};

// ###################################################
// MIDDLEWARE FOR CHECK IF USERNAME OR EMAIL EXISTS
// ###################################################
module.exports.checkUsernameOrEmailExist = (req, res, next) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400).json({
      message: "Missing required data",
    });
    return;
  }

  const data = {
    username: username,
    email: email,
  };

  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error checkUsernameOrEmailExist:", error);
      res.status(500).json(error);
    } else {
      if (results.length == 0) {
        res.locals.username = username;
        res.locals.email = email;
        next();
      } else {
        res.status(409).json({
          message: "Username or email already exists",
        });
        return;
      }
    }
  };

  model.checkUsernameOrEmailExist(data, callback);
};

// #########################################################################################################################################
// DEFINE CONTROLLER FUNCTION TO CHECK IF USERNAME IS A DUPLICATE WHEN REFERENCED AGAINST THE DATABASE (Section A Task 1 + Section A Task 3)
// #########################################################################################################################################
module.exports.checkUsername = (req, res, next) => {
  if (req.route.path == "/:user_id") {
    username = res.locals.updatedUsername.trim();
  } else {
    username = req.body.username.trim();
  }
  if (!username) {
    res.status(400).json({
      message: "Username is undefined",
    });
    return;
  }

  const data = {
    username: username,
  };

  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error checkUsername:", error);
      res.status(500).json(error);
    } else {
      if (results.length == 0) {
        res.locals.username = req.body.username;
        next();
      } else {
        res.status(409).json({
          message: "Username already associated with another user!",
        });
      }
    }
  };

  model.checkUsername(data, callback);
};

// ################################################################
// DEFINE CONTROLLER FUNCTION TO CREATE NEW USER (Section A Task 1)
// ################################################################
module.exports.createNewUser = (req, res, next) => {
  const data = {
    username: res.locals.username,
    skillpoints: 0,
  };

  const callback = (error, results, field) => {
    if (error) {
      console.error("Error createNewUser:", error);
      res.status(500).json(error);
    } else {
      res.status(201).json({
        user_id: results.insertId,
        username: req.body.username,
        skillpoints: data.skillpoints,
      });
    }
  };

  model.insertSingle(data, callback);
};

// ###############################################################
// DEFINE CONTROLLER FUNCTION TO READ ALL USERS (Section A Task 2)
// ###############################################################
module.exports.readAllUsers = (req, res, next) => {
  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error readAllUsers:", error);
      res.status(500).json(error);
    } else res.status(200).json(results);
  };


  model.selectAll(callback);
};

// ##################################################################################################################################################################################################################################################################################################################################
// DEFINE CONTROLLER FUNCTION TO CHECK USER BY ID (Section A Task 3 + Section A Task 4 + Section A Task 6 + Section A Task 8 + Section B Task 16 + Section B Task 17 + Section B Task 21 + Section B Task 23 + Section B Task 24 + Section B Task 27 + Section B Task 28 + Section B Task 30 + Section B Task 31 + Section B Task 32)
// ##################################################################################################################################################################################################################################################################################################################################
module.exports.checkUserById = (req, res, next) => {
  // Determine `user_id` based on the route structure
  const user_id = req.params.user_id || req.params.userId || req.body.user_id || req.body.userId || res.locals.user_id;

  if (!user_id) {
    res.status(400).json({
      message: "user_id is undefined",
    });
    return;
  }

  const data = {
    user_id: user_id,
  };

  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error checkUserById:", error);
      res.status(500).json(error);
    } else if (results.length === 0) {
      res.status(404).json({
        message: "User does not exist!",
      });
    } else {
      // Save `user_id` in res.locals for further use in middlewares
      res.locals.user_id = user_id;
      // Retain compatibility with Section A functionality
      if (req.route.path === "/:challenge_id" && req.params.challenge_id && req.method === "PUT") {
        res.locals.challenge_id = req.params.challenge_id;
        res.locals.challenge = req.body.challenge;
        res.locals.skillpoints = req.body.skillpoints;
        next();
      } else if (req.route.path === "/complete" && res.locals.challenge_id && req.method === "POST") {
        res.locals.challenge = req.body.challenge;
        next();
      }
        else if (req.body.username) {
        res.locals.skillpoints = req.body.skillpoints;
        res.locals.updatedUsername = req.body.username;
        next();
      } else if (req.route.path === "/start/:questId/:userId" && req.method === "POST"){
        res.locals.userId = req.params.userId;
        res.locals.questId = req.params.questId;
        next();
      } else if (req.route.path === "/" && req.method === "POST") {
        res.locals.challenge = req.body.challenge;
        res.locals.skillpoints = req.body.skillpoints;
        next();
      } else if (req.route.path === "/" && req.method === "GET") {
        res.status(200).json(results[0]);
      } else {
        next();
      }
    }
  };

  model.checkById(data, callback);
};

// ##################################################################
// DEFINE CONTROLLER FUNCTION TO UPDATE USER BY ID (Section A Task 3)
// ##################################################################
module.exports.updateUserById = (req, res, next) => {
  const data = {
    user_id: res.locals.user_id,
    updatedUsername: res.locals.updatedUsername,
  };

  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error updateUserById:", error);
      res.status(500).json(error);
    } else {
      if (results.affectedRows == 0) {
        res.status(404).json({
          message: "User does not exist!",
        });
      } else {
        res.status(200).json({
          user_id: res.locals.user_id,
          username: res.locals.updatedUsername,
          skillpoints: res.locals.skillpoints,
        });
      }
    }
  };

  model.updateById(data, callback);
};

// #####################################################################
// DEFINE CONTROLLER FUNCTION TO ADD USER SKILLPOINTS (Section A Task 8)
// #####################################################################
module.exports.addUserSkillpoints = (req, res, next) => {
  const data = {
    user_id: res.locals.user_id,
    skillpoints: res.locals.skillpoints
  };
  
  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error addUserSkillpoints:", error);
    } else {
      res.status(201).json({
        complete_id: res.locals.complete_id,
        challenge_id: res.locals.challenge_id,
        user_id: res.locals.user_id,
        completed: res.locals.completion,
        creation_date: res.locals.creation_date,
        notes: res.locals.notes,
      });
    }
  };

  model.addUserSkillpoints(data, callback);
};

// ####################################################################
// DEFINE CONTROLLER FUNCTION TO UPDATE USER HEALTH (Section B Task 12)
// ####################################################################
module.exports.updateUserHealth = (req, res, next) => {
  const duel = res.locals.duel;
  const userId = duel.user_id;
  const updatedHealth = duel.user_health;
  const duelResult = res.locals.duelResult;

  const data = {
    user_id: userId,
    user_health: updatedHealth,
  };

  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error updateUserHealth:", error);
      res.status(500).json(error);
    } else if (results.affectedRows === 0) {
      res.status(404).json({
        message: "User does not exist or health not updated.",
      });
    } else {
      res.status(200).send(duelResult);
    }
  };

  model.updateUserHealth(data, callback);
};

// ################################################################################
// DEFINE CONTROLLER FUNCTION TO RETRIEVE USER ACTIVITY HISTORY (Section B Task 31)
// ################################################################################
module.exports.getUserActivityHistory = (req, res) => {
  const userId = res.locals.user_id;

  if (!userId) {
      return res.status(400).json({
          message: "User ID is undefined.",
      });
  }

  const data = {
    user_id: userId
  };

  const callback = (error, results) => {
      if (error) {
          console.error("Error getActivityHistory:", error);
          return res.status(500).json(error);
      } else if (!results || results.length === 0) {
          return res.status(404).json({
              message: "No activity history found for this user.",
          });
      } else {
          return res.status(200).json(results);
      }
  };

  model.selectUserActivityHistory(data, callback);
};