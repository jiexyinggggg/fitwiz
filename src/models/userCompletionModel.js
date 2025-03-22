// ##############################################################
// REQUIRE MODULES
// ##############################################################
const pool = require("../services/db");

// ##############################################################
// DEFINE INSERT OPERATION FOR USER COMPLETION (Section A Task 8)
// ##############################################################
module.exports.addUserCompletion = (data, callback) => {
  const SQLSTATEMENT = `
      INSERT INTO UserCompletion (challenge_id, user_id, completed, notes, creation_date) VALUES
      (?, ?, ?, ?, ?);
    `;

  const VALUES = [
    data.challenge_id,
    data.user_id,
    data.completed,
    data.notes,
    data.creation_date
  ];

  pool.query(SQLSTATEMENT, VALUES, callback);
};

// ##############################################################################
// DEFINE SELECT OPERATION FOR USER COMPLETION BY CHALLENGE ID (Section A Task 9)
// ##############################################################################
module.exports.selectUserCompleted = (data, callback) => {
  const SQLSTATEMENT = `
    SELECT user_id,
    CAST(CASE
        WHEN completed = 1 THEN 'true'
        ELSE 'false'
    END AS JSON) AS completed,
    creation_date, notes
    FROM UserCompletion
   
    WHERE challenge_id = ?;
  `;

  const VALUES = [data.challenge_id];

  pool.query(SQLSTATEMENT, VALUES, callback);
};