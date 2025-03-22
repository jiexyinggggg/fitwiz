// ##############################################################
// REQUIRE MODULES
// ##############################################################
const pool = require("../services/db");

// ###################################################
// LOGIN USER
// ###################################################
module.exports.login = (data, callback) => {
  const SQLSTATEMENT = `
      SELECT * FROM User
      WHERE username = ?;
    `;

  const VALUES = [data.username];

  pool.query(SQLSTATEMENT, VALUES, callback);
};

// ###################################################
// REGISTER A NEW USER
// ###################################################
module.exports.register = (data, callback) => {
  const SQLSTATEMENT = `
      INSERT INTO User (username, email, password)
      VALUES (?, ?, ?);
    `;

  const VALUES = [data.username, data.email, data.password];

  pool.query(SQLSTATEMENT, VALUES, callback);
};

// ###################################################
// SELECT USER BY USERNAME OR EMAIL
// ###################################################
module.exports.checkUsernameOrEmailExist = (data, callback) => {
  const SQLSTATEMENT = `
      SELECT * FROM User
      WHERE username = ? OR email = ?;
    `;

  const VALUES = [data.username, data.email];

  pool.query(SQLSTATEMENT, VALUES, callback);
};

// ###############################################################################################
// DEFINE SELECT OPERATION THAT CHECKS FOR EXISTENCE OF USER (Section A Task 1 + Section A Task 3)
// ###############################################################################################
module.exports.checkUsername = (data, callback) => {
  const SQLSTATEMENT = `
    SELECT * FROM User
    WHERE username = ?;
  `;

  const VALUES = [data.username];

  pool.query(SQLSTATEMENT, VALUES, callback);
};

// ###################################################
// DEFINE INSERT OPERATION FOR USER (Section A Task 1)
// ###################################################
module.exports.insertSingle = (data, callback) => {
  const SQLSTATMENT = `
        INSERT INTO User (username, skillpoints)
        VALUES (?, ?);
    `;

  const VALUES = [data.username, data.skillpoints];

  pool.query(SQLSTATMENT, VALUES, callback);
};

// ###################################################
// DEFINE SELECT OPERATION FOR USER (Section A Task 2)
// ###################################################
module.exports.selectAll = (callback) => {
  const SQLSTATEMENT = `
        SELECT * FROM User;
    `;

  pool.query(SQLSTATEMENT, callback);
};

// ####################################################################################################################################################################################################################################################################################################################
// DEFINE SELECT OPERATION FOR USER (Section A Task 3 + Section A Task 4 + Section A Task 6 + Section A Task 8 + Section B Task 16 + Section B Task 17 + Section B Task 21 + Section B Task 23 + Section B Task 24 + Section B Task 27 + Section B Task 28 + Section B Task 30 + Section B Task 31 + Section B Task 32)
// ####################################################################################################################################################################################################################################################################################################################
module.exports.checkById = (data, callback) => {
  const SQLSTATEMENT = `
        SELECT * From User
        WHERE user_id = ?;
    `;

  const VALUES = [data.user_id];

  pool.query(SQLSTATEMENT, VALUES, callback);
};

// ###################################################
// DEFINE UPDATE OPERATION FOR USER (Section A Task 3)
// ###################################################
module.exports.updateById = (data, callback) => {
  const SQLSTATEMENT = `
        UPDATE User
        SET username = ?
        WHERE user_id = ?;
    `;

  const VALUES = [data.updatedUsername, data.user_id];

  pool.query(SQLSTATEMENT, VALUES, callback);
};

// #################################################################################
// DEFINE UPDATE OPERATION TO ADD SKILLPOINTS OPERATIONS FOR USER (Section A Task 8)
// #################################################################################
module.exports.addUserSkillpoints = (data, callback) => {
  const SQLSTATEMENT = `
    UPDATE User
    SET skillpoints = skillpoints + ?
    WHERE user_id = ?
  `;

  const VALUES = [data.skillpoints, data.user_id];

  pool.query(SQLSTATEMENT, VALUES, callback);
};

// ################################################################
// DEFINE UPDATE OPERATION TO UPDATE USER HEALTH (Section B Task 3)
// ################################################################
module.exports.updateUserHealth = (data, callback) => {
  const SQLSTATEMENT = `
    UPDATE User
    SET user_health = ?
    WHERE user_id = ?;
  `;

  const VALUES = [data.user_health, data.user_id];

  pool.query(SQLSTATEMENT, VALUES, callback);
};

// #########################################################################
// DEFINE SELECT OPERATION TO READ USER ACTIVITY HISTORY (Section B Task 31)
// #########################################################################
module.exports.selectUserActivityHistory = (data, callback) => {
  const SQLSTATEMENT = `
     SELECT 'Challenge' AS activity_type, 
            CONCAT('Completed challenge: ', fc.challenge) AS activity_detail, 
            'Completed' AS activity_status, 
            uc.creation_date AS activity_date
     FROM UserCompletion uc
     JOIN FitnessChallenge fc ON uc.challenge_id = fc.challenge_id
     WHERE uc.user_id = ?

     UNION ALL

     SELECT 'Duel' AS activity_type, 
            CONCAT('Duel with creature: ', c.creature_name) AS activity_detail, 
            d.result AS activity_status, 
            d.created_at AS activity_date
     FROM Duel d
     JOIN Creature c ON d.creature_id = c.creature_id
     WHERE d.user_id = ?

     UNION ALL

     SELECT 'Quest' AS activity_type, 
            CONCAT('Completed quest: ', q.quest_name) AS activity_detail, 
            uq.status AS activity_status, 
            uq.completion_date AS activity_date
     FROM UserQuest uq
     JOIN Quest q ON uq.quest_id = q.quest_id
     WHERE uq.user_id = ? AND uq.status = 'Completed'

     UNION ALL

     SELECT 'House Selection' AS activity_type, 
            CONCAT('Chosen house: ', hh.house_name) AS activity_detail, 
            NULL AS activity_status, 
            uh.sorted_at AS activity_date
     FROM UserHouse uh
     JOIN HogwartsHouse hh ON uh.house_id = hh.house_id
     WHERE uh.user_id = ?
      
     ORDER BY activity_date DESC;
  `;

  const VALUES = [data.user_id, data.user_id, data.user_id, data.user_id];
  pool.query(SQLSTATEMENT, VALUES, callback);
};