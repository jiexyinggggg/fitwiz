// ##############################################################
// REQUIRE MODULES
// ##############################################################
const pool = require("../services/db");

// #################################################################
// DEFINE SELECT OPERATION TO READ ALL CREATURES (Section B Task 11)
// #################################################################
module.exports.selectAllCreatures = (callback) => {
  const SQLSTATEMENT = `
    SELECT *
    FROM Creature;
  `;

  pool.query(SQLSTATEMENT, callback);
};

// ##################################################################
// DEFINE SELECT OPERATION TO CHECK ONGOING DUELS (Section B Task 12)
// ##################################################################
module.exports.selectOngoingDuel = (data, callback) => {
  const SQLSTATEMENT = `
    SELECT *
    FROM Duel
    WHERE user_id = ? AND creature_id = ? AND result = 'started';
  `;

  const VALUES = [data.user_id, data.creature_id];

  pool.query(SQLSTATEMENT, VALUES, callback);
};

// ##############################################################################
// DEFINE SELECT OPERATION TO CHECK USER ELIGIBILITY FOR DUEL (Section B Task 12)
// ##############################################################################
module.exports.selectUserEligibility = (data, callback) => {
  const SQLSTATEMENT = `
    SELECT
      u.skillpoints,
      GROUP_CONCAT(v.wand_id) AS wand_id,
      GROUP_CONCAT(v.potion_quantity) AS potion_quantity,
      GROUP_CONCAT(v.spell_id) AS spell_id
    FROM User u
    LEFT JOIN Vault v ON u.user_id = v.user_id
    WHERE u.user_id = ?;
  `;

  const VALUES = [data.user_id];

  pool.query(SQLSTATEMENT, VALUES, callback);
};

// ##################################################################################
// DEFINE UPDATE OPERATION TO DEDUCT INITIAL SKILLPOINTS FOR DUEL (Section B Task 12)
// ##################################################################################
module.exports.deductSkillpointsForDuel = (data, callback) => {
  const SQLSTATEMENT = `
    UPDATE User
    SET skillpoints = skillpoints - 10
    WHERE user_id = ? AND skillpoints >= 10;
  `;

  const VALUES = [data.user_id];

  pool.query(SQLSTATEMENT, VALUES, callback);
};

// ###################################################################
// DEFINE SELECT OPERATION TO READ CREATURE HEALTH (Section B Task 12)
// ###################################################################
module.exports.readCreatureHealth = (data, callback) => {
  const SQLSTATEMENT = `
    SELECT creature_health
    FROM Creature
    WHERE creature_id = ?;
   `;

   const VALUES = [data.creature_id];

   pool.query(SQLSTATEMENT, VALUES, callback);
};
 
// #########################################################################
// DEFINE INSERT OPERATION TO CREATE INITIAL DUEL RECORD (Section B Task 12)
// #########################################################################
module.exports.insertDuelRecord = (data, callback) => {
  const SQLSTATEMENT = `
    INSERT INTO Duel (user_id, creature_id, result, user_health, creature_health)
    VALUES (?, ?, ?, ?, ?);
  `;

  const VALUES = [data.user_id, data.creature_id, data.result, data.user_health, data.creature_health];

  pool.query(SQLSTATEMENT, VALUES, callback);
};

// ###################################################################
// DEFINE SELECT OPERATION TO READ DAMAGE ITEM IDs (Section B Task 13)
// ###################################################################
module.exports.readDamageItemId = (data, callback) =>{
  const SQLSTATEMENT = `
      SELECT GROUP_CONCAT(potion_id) AS potion_id, GROUP_CONCAT(spell_id) AS spell_id, SUM(potion_quantity) AS potion_quantity FROM Vault
      WHERE user_id = ?;
  `;
  const VALUES = [data.user_id];
  pool.query(SQLSTATEMENT, VALUES, callback);
};

// #################################################################################
// DEFINE SELECT OPERATION TO READ POTION DAMAGE AND HEAL VALUES (Section B Task 13)
// #################################################################################
module.exports.readDamageValuePotion = (data, callback) => {
  const SQLSTATEMENT = `
      SELECT potion_damage, potion_heal
      FROM PotionShop
      WHERE potion_id = ?;
  `;
  const VALUES = [data.potion_id];
  pool.query(SQLSTATEMENT, VALUES, callback);
};

// ######################################################################
// DEFINE SELECT OPERATION TO READ SPELL DAMAGE VALUE (Section B Task 13)
// ######################################################################
module.exports.readDamageValueSpell = (data, callback) => {
  const SQLSTATEMENT = `
      SELECT spell_damage
      FROM SpellShop
      WHERE spell_id = ?;
  `;
  const VALUES = [data.spell_id];
  pool.query(SQLSTATEMENT, VALUES, callback);
};

// ##############################################################
// DEFINE SELECT OPERATION TO READ DUEL BY ID (Section B Task 13)
// ##############################################################
module.exports.readDuelById = (data, callback) => {
  const SQLSTATEMENT = `
      SELECT *
      FROM Duel
      WHERE duel_id = ?;
  `;
  const VALUES = [data.duel_id];
  pool.query(SQLSTATEMENT, VALUES, callback);
};

// ###########################################################################
// DEFINE SELECT OPERATION TO FETCH REWARD POINTS FOR DUEL (Section B Task 13)
// ###########################################################################
module.exports.fetchDuelRewardPoints = (data, callback) => {
  const SQLSTATEMENT = `
    SELECT reward_points
    FROM Creature
    WHERE creature_id = ?;
  `;

  const VALUES = [data.creature_id];
  pool.query(SQLSTATEMENT, VALUES, callback);
};

// ##################################################################
// DEFINE UPDATE OPERATION TO UPDATE DUEL OUTCOME (Section B Task 13)
// ##################################################################
module.exports.simulateDuelAndUpdateOutcome = (data, callback) => {
  const SQLSTATEMENT = `
    UPDATE Duel
    SET result = ?, user_health = ?, creature_health = ?, skillpoints_gained = ?, skillpoints_deducted = ?
    WHERE duel_id = ?;
  `;

  const VALUES = [
    data.result,
    data.user_health,
    data.creature_health,
    data.skillpoints_gained,
    data.skillpoints_deducted,
    data.duel_id,
  ];

  pool.query(SQLSTATEMENT, VALUES, callback);
}

// ########################################################################
// DEFINE UPDATE OPERATION TO ADD REWARD POINTS TO USER (Section B Task 13)
// ########################################################################
module.exports.addDuelRewardPoints = (data, callback) => {
  const SQLSTATEMENT = `
    UPDATE User
    SET skillpoints = skillpoints + ?
    WHERE user_id = ?
  `;

  const VALUES = [data.rewardPoints, data.user_id];

  pool.query(SQLSTATEMENT, VALUES, callback);
};

// #################################################################################
// DEFINE SELECT OPERATION TO RETRIEVE ALL DUELS IN THE DATABASE (Section B Task 14)
// #################################################################################
module.exports.getAllDuels = (callback) => {
  const SQLSTATEMENT = `
    SELECT * FROM Duel;
  `;

  pool.query(SQLSTATEMENT, callback);
}

// ###############################################################################
// DEFINE SELECT OPERATION TO RETRIEVE DUEL DETAILS BY DUEL ID (Section B Task 15)
// ###############################################################################
module.exports.getDuelDetails = (data, callback) => {
  const SQLSTATEMENT = `
    SELECT * FROM Duel
    WHERE duel_id = ?;
  `;

  const VALUES = [data.duelId];

  pool.query(SQLSTATEMENT, VALUES, callback);
}