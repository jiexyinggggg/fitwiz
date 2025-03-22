// ##############################################################
// REQUIRE MODULES
// ##############################################################
const pool = require("../services/db");

// ###########################################################################
// DEFINE SELECT OPERATION TO RETRIEVE ALL HOGWARTS HOUSES (Section B Task 16)
// ###########################################################################
module.exports.selectAllHouses = (callback) => {
    const SQLSTATEMENT = `
      SELECT *
      FROM HogwartsHouse;
    `;
    pool.query(SQLSTATEMENT, callback);
};

// ###########################################################################################
// DEFINE SELECT OPERATION TO CHECK IF USER IS ALREADY ASSIGNED TO A HOUSE (Section B Task 17)
// ###########################################################################################
module.exports.checkIfUserSorted = (data, callback) => {
    const SQLSTATEMENT = `
        SELECT * 
        FROM UserHouse 
        WHERE user_id = ?;
    `;
    const VALUES = [data.user_id];
    pool.query(SQLSTATEMENT, VALUES, callback);
};

// ##############################################################################
// DEFINE INSERT OPERATION TO ASSIGN USER TO A HOGWARTS HOUSE (Section B Task 17)
// ##############################################################################
module.exports.assignUserToHouse = (data, callback) => {
    const SQLSTATEMENT = `
      INSERT INTO UserHouse (user_id, house_id, sorted_at)
      VALUES (?, ?, CURRENT_TIMESTAMP)
      ON DUPLICATE KEY UPDATE house_id = house_id; -- Prevent duplicates without making changes
    `;
    const VALUES = [data.user_id, data.house_id];
    pool.query(SQLSTATEMENT, VALUES, callback);
};

// ###################################################################
// DEFINE SELECT OPERATION TO GET HOUSE NAME BY ID (Section B Task 17)
// ###################################################################
module.exports.getHouseNameById = (data, callback) => {
  const SQLSTATEMENT = `
    SELECT house_name
    FROM HogwartsHouse
    WHERE house_id = ?;
  `;
  const VALUES = [data.house_id];
  pool.query(SQLSTATEMENT, VALUES, callback);
};

// ###############################################################################
// DEFINE SELECT OPERATION TO RETRIEVE USER'S HOUSE BY USER ID (Section B Task 18)
// ###############################################################################
module.exports.selectUserHouse = (data, callback) => {
  const SQLSTATEMENT = `
      SELECT HogwartsHouse.house_name, UserHouse.sorted_at
      FROM UserHouse
      INNER JOIN HogwartsHouse ON UserHouse.house_id = HogwartsHouse.house_id
      WHERE UserHouse.user_id = ?;
  `;

  const VALUES = [data.user_id];

  pool.query(SQLSTATEMENT, VALUES, callback);
};