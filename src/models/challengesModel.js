// ##############################################################
// REQUIRE MODULES
// ##############################################################
const pool = require("../services/db");

// #######################################################################
// DEFINE INSERT OPERATION FOR CREATING A NEW CHALLENGE (Section A Task 4)
// #######################################################################
module.exports.insertSingle = (data, callback) => {
  const SQLSTATEMENT = `
        INSERT INTO FitnessChallenge (challenge, creator_id, skillpoints)
        VALUES (?, ?, ?);
    `;

  const VALUES = [data.challenge, data.user_id, data.skillpoints];

  pool.query(SQLSTATEMENT, VALUES, callback);
};

// ###############################################################################
// DEFINE SELECT OPERATION OPERATION FOR READING ALL CHALLENGES (Section A Task 5)
// ###############################################################################
module.exports.selectAll = (callback) => {
  const SQLSTATEMENT = `
        SELECT challenge_id, challenge, creator_id, skillpoints FROM FitnessChallenge;
        `;

  pool.query(SQLSTATEMENT, callback);
};

// ##########################################################################################
// DEFINE SELECT OPERATION FOR CHECKING CHALLENGE BY ID (Section A Task 6 + Section A Task 8)
// ##########################################################################################
module.exports.checkChallengeById = (data, callback) => {
  const SQLSTATEMENT = `
    SELECT * FROM FitnessChallenge
    WHERE challenge_id = ?;
  `;

  const VALUES = [data.challenge_id];
  pool.query(SQLSTATEMENT, VALUES, callback);
};

// ##################################################################################
// DEFINE SELECT OPERATION FOR CHECKING USER ID AGAINST CREATOR ID (Section A Task 6)
// ##################################################################################
module.exports.checkUserIdAgainstCreatorId = (data, callback) => {
  const SQLSTATEMENT = `
    SELECT * FROM FitnessChallenge
    WHERE creator_id = ? AND challenge = ?;
  `;

  const VALUES = [data.user_id, data.databaseChallenge];
  pool.query(SQLSTATEMENT, VALUES, callback);
};

// #################################################################
// DEFINE UPDATE OPERATION FOR UPDATING CHALLENGE (Section A Task 6)
// #################################################################
module.exports.updateChallenge = (data, callback) => {
  const SQLSTATEMENT = `
    UPDATE FitnessChallenge
    SET challenge = ?, skillpoints = ?
    WHERE challenge_id = ? AND creator_id = ?;
  `;

  const VALUES = [data.challenge, data.skillpoints, data.challenge_id, data.user_id];
  pool.query(SQLSTATEMENT, VALUES, callback);
};

// #################################################################
// DEFINE DELETE OPERATION FOR DELETING CHALLENGE (Section A Task 7)
// #################################################################
module.exports.deleteChallenge = (data, callback) => {
  const SQLSTATEMENT = `
    DELETE FROM FitnessChallenge
    WHERE challenge_id = ?;
  `;

  const VALUES = [data.challenge_id];
  pool.query(SQLSTATEMENT, VALUES, callback);
};

// ############################################################################################
// DEFINE DELETE OPERATION FOR DELETING REMOVED CHALLENGE'S USER COMPLETIONS (Section A Task 7)
// ############################################################################################
module.exports.deleteRemovedChallengeUserCompletions = (data, callback) => {
  const SQLSTATEMENT = `
    DELETE FROM UserCompletion
    WHERE complete_id = ?;
  `;

  const VALUES = [data.challenge_id];
  pool.query(SQLSTATEMENT, VALUES, callback);
};