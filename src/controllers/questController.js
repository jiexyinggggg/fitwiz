// ##############################################################
// REQUIRE MODULES
// ##############################################################
const model = require("../models/questModel.js");

// #####################################################################
// DEFINE CONTROLLER FUNCTION TO RETRIEVE ALL QUESTS (Section B Task 26)
// #####################################################################
module.exports.getAllQuests = (req, res, next) => {
  const callback = (error, results) => {
      if (error) {
          console.error("Error getAllQuests:", error);
          res.status(500).json(error);
      } else if (results.length === 0) {
          res.status(404).json({
              message: "No quests found in the database.",
          });
      } else {
          res.status(200).json(results);
      }
  };

  model.selectAllQuests(callback);
};

// #######################################################################
// DEFINE CONTROLLER FUNCTION TO CHECK IF QUEST EXISTS (Section B Task 27)
// #######################################################################
module.exports.checkQuestExistence = (req, res, next) => {
  const questId = req.params.questId;
  if (!questId) {
    res.status(400).send("questId is undefined");
    return;
  }

  const data = {
    questId: questId,
  };

  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error checkQuestExistence:", error);
      res.status(500).json(error);
    } else {
      if (results.length == 0) {
        res.status(404).json({
          message: "Quest does not exist!",
        });
        return;
      } else {
        next();
      }
    }
  };

  model.checkQuestExistence(data, callback);
};

// ##########################################################################
// DEFINE CONTROLLER FUNCTION TO CHECK QUEST AVAILABILITY (Section B Task 27)
// ##########################################################################
module.exports.checkQuestAvailability = (req, res, next) => {
  const userId = req.params.userId;
  const questId = req.params.questId;

  if (!userId || !questId) {
    res.status(400).json({
      message: "userId or questId is undefined.",
    });
    return;
  }

  const data = {
    user_id: userId,
    quest_id: questId,
  };

  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error checkQuestAvailability:", error);
      res.status(500).json(error);
    } 
    
    else{
      if (results.length == 0) {
        // If no quest is in progress, proceed to the next middleware
        next();
      } else {
        if (results[0].status === "Completed") {
            res.status(409).json({
                message: "Quest already completed!"
            });
        }
        else {
            res.status(409).json({
                message: "Quest already started!"
            });
        }
      }
    }
  };

  model.selectQuestAvailability(data, callback);
};

// ############################################################################
// DEFINE CONTROLLER FUNCTION TO START A QUEST FOR THE USER (Section B Task 27)
// ############################################################################
module.exports.startQuest = (req, res, next) => {
  const data = {
    user_id: req.params.userId,
    quest_id: req.params.questId
  };

  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error startQuest:", error);
      res.status(500).json(error);
    } else {
      res.locals.userQuestId = results.insertId;
      next();
    }
  };

  model.startQuest(data, callback);
};

// ####################################################################
// DEFINE CONTROLLER FUNCTION TO DISPLAY QUEST INFO (Section B Task 27)
// ####################################################################
module.exports.displayQuestInfo = (req, res, next) => {
  const data = {
      userId: req.params.userId,
      questId: req.params.questId,
      userQuestId: res.locals.userQuestId
  }

  const callback = (error, results, fields) => {

      if (error) {
        console.error("Error displayQuestInfo:", error);
        res.status(500).json(error);
      }

      else {
        res.status(200).json(results[0]);
      }
  }

  model.displayQuestInfo(data, callback);
}

// ###################################################################
// DEFINE CONTROLLER FUNCTION TO VALIDATE QUEST ID (Section B Task 28)
// ###################################################################
module.exports.validateQuestId = (req, res, next) => {
  const questId = parseInt(req.params.questId);
  const userId = parseInt(req.params.userId);
  if (!questId || !Number.isInteger(questId) || !userId || !Number.isInteger(userId)) {
    if (!questId || !Number.isInteger(questId)){
    res.status(400).json({
      message: "questId is undefined",
    });
    return;
  }

  else {
    res.status(400).json({
      message: "userId is undefined",
    });
    return;
    }
  }

  const data = {
    user_id: userId,
    quest_id: questId,
  };

  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error validateQuestId:", error);
      res.status(500).json(error);
    } else {
      if (results.length == 0) {
        res.status(404).json({
          message: "Quest not embarked!", 
        });
        return;
      }
      
      else if (results[0].status === "Completed" && results[0].progress === "1 / 1 tasks completed") {
        res.status(409).json({
          message: "Quest already completed!"
        });
        return;
      }
      
      else {
        res.locals.quest_id = questId;
        res.locals.user_id = userId;
        res.locals.status = req.body.status;
        next();
      }
    }
  };
  model.checkQuestById(data, callback);
};

// ############################################################################
// DEFINE CONTROLLER FUNCTION TO ADD USER COMPLETION STATUS (Section B Task 28)
// ############################################################################
module.exports.addUserCompletion = (req, res, next) => {

  if (!res.locals.status || res.locals.status != "Completed") {
    res.status(400).json({
      message: "Invalid status!"
    })
    return; 
  }

  const data = {
    user_id: res.locals.user_id,
    quest_id: res.locals.quest_id,
    status: res.locals.status,
    progress: "1 / 1 tasks completed",
    completion_date: new Date()
  };

  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error addUserCompletion:", error);
      res.status(500).json(error);
    } else {
      res.locals.status = data.status;
      res.locals.progress = '1 / 1 tasks completed';
      res.locals.completion_date = data.completion_date.toISOString().replace('T', ' ').slice(0, 19);
      next();
    }
  };

  model.addUserCompletion(data, callback);
};

// ###########################################################################
// DEFINE CONTROLLER FUNCTION TO FETCH QUEST REWARD POINTS (Section B Task 28)
// ###########################################################################
module.exports.fetchQuestRewardPoints = (req, res, next) => {
  const quest_id = res.locals.quest_id;

  const data = {
    quest_id: quest_id
  }

  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error fetchQuestRewardPoints:", error);
      res.status(500).json(error);
    }

    else {
      res.locals.rewardPoints = results[0].reward_points;
      next();
    }
  }

  model.fetchQuestRewardPoints(data, callback);
}

// #########################################################################
// DEFINE CONTROLLER FUNCTION TO ADD QUEST REWARD POINTS (Section B Task 28)
// #########################################################################
module.exports.addQuestRewardPoints = (req, res, next) => {
  const data = {
    rewardPoints: res.locals.rewardPoints,
    user_id: res.locals.user_id,
  };

  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error addQuestRewardPoints:", error);
      res.status(500).json(error);
    } else {
      res.status(201).json({
        quest_id: res.locals.challenge_id,
        user_id: res.locals.user_id,
        status: res.locals.status,
        progress: res.locals.progress,
        completion_date: res.locals.completion_date
      });
    }
  };

  model.addQuestRewardPoints(data, callback);
};

// ################################################################################
// DEFINE CONTROLLER FUNCTION TO RETRIEVE ALL QUEST COMPLETIONS (Section B Task 29)
// ################################################################################
module.exports.getAllQuestCompletion = (req, res, next) => {
  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error getAllQuestCompletion:")
      res.status(500).json(error);
    }
    else {
      if (results.length == 0) {
        res.status(404).json({
          message: "No completion records found!"
        });
        return;
      }
      else {
        res.status(200).json(results);
      }
    }
  }

  model.getAllQuestCompletion(callback);
}

// ######################################################################################
// DEFINE CONTROLLER FUNCTION TO RETRIEVE QUEST COMPLETION BY USER ID (Section B Task 30)
// ######################################################################################
module.exports.getQuestCompletionById = (req, res, next) => {
  const user_id = res.locals.user_id;

  const data = {
    user_id: user_id
  };

  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error getAllQuestCompletion:")
      res.status(500).json(error);
    }
    else {
      if (results.length == 0) {
        res.status(404).json({
          message: "No completion records found!"
        });
        return;
      }
      else {
        res.status(200).json(results);
      }
    }
  }

  model.getQuestCompletionById(data, callback);
}