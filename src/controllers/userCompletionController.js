// ##############################################################
// REQUIRE MODULES
// ##############################################################
const model = require("../models/userCompletionModel.js");

// ####################################################################
// DEFINE CONTROLLER FUNCTION TO ADD USER COMPLETION (Section A Task 8)
// ####################################################################
module.exports.addUserCompletion = (req, res, next) => {
  const creation_date = res.locals.creation_date;

  if (!creation_date) {
    res.status(400).json({
      message: "creation_date is undefined",
    });
    return;
  }
  
  const data = {
    user_id: res.locals.user_id,
    challenge_id: res.locals.challenge_id,
    creation_date: res.locals.creation_date,
    completed: res.locals.completion,
    notes: res.locals.notes,
  };

  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error addUserCompletion:", error);
      res.status(500).json(error);
    } else {
      res.locals.complete_id = results.insertId;
      next();
    }
  };

  model.addUserCompletion(data, callback);
};

// #######################################################################################
// DEFINE CONTROLLER FUNCTION TO RETRIEVE LIST OF USERS BY CHALLENGE ID (Section A Task 9)
// #######################################################################################
module.exports.selectUserCompleted = (req, res, next) => {
  const challenge_id = req.params.challenge_id;

  if (!challenge_id) {
    res.status(400).json({
      message: "challenge_id is undefined",
    });
    return;
  }

  const data = {
    challenge_id: challenge_id,
  };

  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error selectUserCompleted:", error);
      res.status(500).json(error);
    } else {
      if (results.length == 0) {
        res.status(404).json({
          message: "Challenge has not been attempted by any user!",
        });
      } else {
        res.status(200).json(results);
      }
    }
  };
  model.selectUserCompleted(data, callback);
};