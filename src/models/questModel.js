// ##############################################################
// REQUIRE MODULES
// ##############################################################
const pool = require("../services/db");

// ##################################################################
// DEFINE SELECT OPERATION TO RETRIEVE ALL QUESTS (Section B Task 26)
// ##################################################################
module.exports.selectAllQuests = (callback) => {
    const SQLSTATEMENT = `
        SELECT * 
        FROM Quest;
    `;

    pool.query(SQLSTATEMENT, callback);
};

// ####################################################################
// DEFINE SELECT OPERATION TO CHECK QUEST EXISTENCE (Section B Task 27)
// ####################################################################
module.exports.checkQuestExistence = (data, callback) => {
  const SQLSTATEMENT = `
    SELECT * FROM Quest
    WHERE quest_id = ?;
  `;

  const VALUES = [data.questId];
  pool.query(SQLSTATEMENT, VALUES, callback);
};
  
// ############################################################################
// DEFINE SELECT OPERATION TO CHECK IF QUEST IS IN PROGRESS (Section B Task 27)
// ############################################################################
module.exports.selectQuestAvailability = (data, callback) => {
  const SQLSTATEMENT = `
    SELECT *
    FROM UserQuest
    WHERE user_id = ? AND quest_id = ? AND status IN ('In Progress', 'Completed');
  `;

  const VALUES = [data.user_id, data.quest_id];

  pool.query(SQLSTATEMENT, VALUES, callback);
};

// ############################################################
// DEFINE INSERT OPERATION TO START A QUEST (Section B Task 27)
// ############################################################
module.exports.startQuest = (data, callback) => {
  const SQLSTATEMENT = `
    INSERT INTO UserQuest (user_id, quest_id, progress)
    VALUES (?, ?, '0 / 1 tasks completed');

    `;

  const VALUES = [data.user_id, data.quest_id];

  pool.query(SQLSTATEMENT, VALUES, callback);
};

// #################################################################
// DEFINE SELECT OPERATION TO DISPLAY QUEST INFO (Section B Task 27)
// #################################################################
module.exports.displayQuestInfo = (data, callback) => {
  const SQLSTATEMENT = `
    SELECT Quest.quest_id, Quest.quest_name, Quest.description, UserQuest.status, UserQuest.progress
    FROM UserQuest
    INNER JOIN Quest
    ON Quest.quest_id = UserQuest.quest_id
    WHERE UserQuest.user_id = ? AND UserQuest.quest_id = ? AND UserQuest.user_quest_id = ?;
    `;

  const VALUES = [data.userId, data.questId, data.userQuestId];

  pool.query(SQLSTATEMENT, VALUES, callback);
};

// ################################################################
// DEFINE SELECT OPERATION TO CHECK QUEST BY ID (Section B Task 28)
// ################################################################
module.exports.checkQuestById = (data, callback) => {
  const SQLSTATEMENT = `
    SELECT * FROM UserQuest
    WHERE user_id = ? AND quest_id = ?;
  `;

  const VALUES = [data.user_id, data.quest_id];
  pool.query(SQLSTATEMENT, VALUES, callback);
};

// #########################################################################
// DEFINE UPDATE OPERATION TO ADD USER COMPLETION STATUS (Section B Task 28)
// #########################################################################
module.exports.addUserCompletion = (data, callback) => {
  const SQLSTATEMENT = `
      UPDATE UserQuest 
      SET status = ?, progress = ?, completion_date = ?
      WHERE user_id = ? AND quest_id = ?;
    `;

  const VALUES = [
    data.status,
    data.progress,
    data.completion_date,
    data.user_id,
    data.quest_id
  ];

  pool.query(SQLSTATEMENT, VALUES, callback);
};

// ########################################################################
// DEFINE SELECT OPERATION TO FETCH QUEST REWARD POINTS (Section B Task 28)
// ########################################################################
module.exports.fetchQuestRewardPoints = (data, callback) => {
  const SQLSTATEMENT = `
    SELECT reward_points
    FROM Quest
    WHERE quest_id = ?;
  `;
  const VALUES = [data.quest_id];
  pool.query(SQLSTATEMENT, VALUES, callback);
}

// ######################################################################
// DEFINE UPDATE OPERATION TO ADD QUEST REWARD POINTS (Section B Task 28)
// ######################################################################
module.exports.addQuestRewardPoints = (data, callback) => {
  const SQLSTATEMENT = `
    UPDATE User
    SET skillpoints = skillpoints + ?
    WHERE user_id = ?
  `;

  const VALUES = [data.rewardPoints, data.user_id];

  pool.query(SQLSTATEMENT, VALUES, callback);
};

// #########################################################################
// DEFINE SELECT OPERATION TO READ ALL QUEST COMPLETIONS (Section B Task 29)
// #########################################################################
module.exports.getAllQuestCompletion = (callback) => {
  const SQLSTATEMENT = `
    SELECT *
    FROM UserQuest
    WHERE status = "Completed" AND progress = "1 / 1 tasks completed";
  `;

  pool.query(SQLSTATEMENT, callback);
};

// ###############################################################################
// DEFINE SELECT OPERATION TO READ COMPLETED QUESTS BY USER ID (Section B Task 30)
// ###############################################################################
module.exports.getQuestCompletionById = (data, callback) => {
  const SQLSTATEMENT = `
    SELECT *
    FROM UserQuest
    WHERE user_id = ? AND status = "Completed" AND progress = "1 / 1 tasks completed";
  `;

  const VALUES = [data.user_id];

  pool.query(SQLSTATEMENT, VALUES, callback);
}