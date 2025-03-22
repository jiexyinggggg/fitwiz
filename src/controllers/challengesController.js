// ##############################################################
// REQUIRE MODULES
// ##############################################################
const model = require("../models/challengesModel");

// #####################################################################
// DEFINE CONTROLLER FUNCTION TO CREATE NEW CHALLENGE (Section A Task 4)
// #####################################################################
module.exports.createNewChallenge = (req, res, next) => {
  const challenge = res.locals.challenge;
  const skillpoints = res.locals.skillpoints;

  if (!challenge || !skillpoints) {
    if (!challenge){
    res.status(400).json({
        message: "Challenge is undefined."
    });
    return;
    }

    else {
        res.status(400).json({
            message: "Skillpoints is undefined"
        })
        return;
    }
  }

  const data = {
    user_id: res.locals.user_id,
    challenge: challenge,
    skillpoints: res.locals.skillpoints
  };

  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error createNewChallenge:", error);
      res.status(500).json(error);
    } else {
      res.status(201).json({
        challenge_id: results.insertId,
        challenge: res.locals.challenge,
        creator_id: res.locals.user_id,
        skillpoints: res.locals.skillpoints
      });
    }
  };

  model.insertSingle(data, callback);
};

// ####################################################################
// DEFINE CONTROLLER FUNCTION TO READ ALL CHALLENGES (Section A Task 5)
// ####################################################################
module.exports.readAllChallenges = (req, res, next) => {
  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error readAllChallenges:", error);
      res.status(500).json(error);
    } else res.status(200).json(results);
  };

  model.selectAll(callback);
};

// ##########################################################################
// DEFINE CONTROLLER FUNCTION TO CHECK FOR CHALLENGE BY ID (Section A Task 6)
// ##########################################################################
module.exports.checkChallengeById = (req, res, next) => {
  const challenge_id = res.locals.challenge_id;
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
      console.error("Error checkChallengeById:", error);
      res.status(500).json(error);
    } else {
      if (results.length == 0) {
        res.status(404).json({
          message: "Challenge not found!",
        });
      } else {
        res.locals.databaseChallenge = results[0];
        next();
      }
    }
  };
  model.checkChallengeById(data, callback);
};

// ##############################################################################################################
// DEFINE CONTROLLER FUNCTION TO CHECK USER ID AGAINST CREATOR ID BEFORE UPDATING OF CHALLENGE (Section A Task 6)
// ##############################################################################################################
module.exports.checkUserIdAgainstCreatorId = (req, res, next) => {
  const user_id = res.locals.user_id;
  const challenge = res.locals.challenge;

  if (!user_id || !challenge) {
    if (!user_id) {
      res.status(400).json({
        message: "user_id is undefined",
      });
      return;
    } else {
      res.status(400).json({
        message: "Challenge is undefined",
      });
      return;
    }
  }

  const data = {
    user_id: res.locals.user_id,
    databaseChallenge: res.locals.databaseChallenge.challenge,
  };

  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error checkUserIdAgainstCreatorId:", error);
      res.status(500).json(error);
    } else {
      if (results.length == 0) {
        res.status(403).json({
          message: "User is not the owner of this challenge!",
        });
      } else {
        next();
      }
    }
  };

  model.checkUserIdAgainstCreatorId(data, callback);
};

// #################################################################
// DEFINE CONTROLLER FUNCTION TO UPDATE CHALLENGE (Section A Task 6)
// #################################################################
module.exports.updateChallenge = (req, res, next) => {
  if (!res.locals.skillpoints){
      res.status(400).json({
          message: "Skillpoints is undefined"
      })
      return;
  }

  if (res.locals.databaseChallenge.skillpoints == req.body.skillpoints) {
    skillpoints = res.locals.databaseChallenge.skillpoints;
  } else {
    skillpoints = req.body.skillpoints
  }

  const data = {
    user_id: res.locals.user_id,
    challenge_id: res.locals.challenge_id,
    challenge: res.locals.challenge,
    skillpoints: skillpoints
  };

  const callback = (error, results, fields) => {
    if (error) {
      console.error("updateChallenge:", error);
      res.status(500).json(error);
    } else {
      res.status(200).json({
        challenge_id: res.locals.challenge_id,
        challenge: res.locals.challenge,
        creator_id: res.locals.user_id,
        skillpoints: res.locals.skillpoints
      });
    }
  };

  model.updateChallenge(data, callback);
};

// #################################################################
// DEFINE CONTROLLER FUNCTION TO DELETE CHALLENGE (Section A Task 7)
// #################################################################
module.exports.deleteChallenge = (req, res, next) => {
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
      console.error("Error deleteChallenge:", error);
      res.status(500).json(error);
    } else {
      if (results.affectedRows == 0) {
        res.status(404).json({
          message: "challenge_id does not exist",
        });
      } else {
        res.locals.challenge_id = req.params.challenge_id;
        next();
      }
    }
  };
  model.deleteChallenge(data, callback);
};

// ############################################################################################
// DEFINE CONTROLLER FUNCTION TO DELETE REMOVED CHALLENGES'S USER COMPLETION (Section A Task 7)
// ############################################################################################
module.exports.deleteRemovedChallengeUserCompletions = (req, res, next) => {
  const data = {
    challenge_id: res.locals.challenge_id,
  };

  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error deleteRemovedChallengeUserCompletion:", error);
      res.status(500).json(error);
    } else {
      res.status(204).send();
    }
  };

  model.deleteRemovedChallengeUserCompletions(data, callback);
};

// ######################################################################
// DEFINE CONTROLLER FUNCTION TO VALIDATE CHALLENGE ID (Section A Task 8)
// ######################################################################
module.exports.validateChallengeId = (req, res, next) => {
  const challenge_id = parseInt(req.body.challenge_id);
  if (!challenge_id || !Number.isInteger(challenge_id)) {
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
      console.error("Error validateChallengeId:", error);
      res.status(500).json(error);
    } else {
      if (results.length == 0) {
        res.status(404).json({
          message: "Challenge not found!",
        });
      } else {
        res.locals.challenge_id = challenge_id;
        res.locals.user_id = res.locals.user_id;
        res.locals.creation_date = req.body.creation_date;
        res.locals.completion = req.body.completed;
        res.locals.notes = req.body.notes;
        res.locals.skillpoints = results[0].skillpoints;
        next();
      }
    }
  };
  model.checkChallengeById(data, callback);
};