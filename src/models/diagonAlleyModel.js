// ##############################################################
// REQUIRE MODULES
// ##############################################################
const pool = require("../services/db");

// ################################################################################
// DEFINE SELECT OPERATION TO FETCH ALL WANDS FROM THE WAND SHOP (Section B Task 1)
// ################################################################################
module.exports.selectAllWands = (callback) => {
  const SQLSTATEMENT = `
    SELECT *
    FROM WandShop;
  `;

  pool.query(SQLSTATEMENT, callback);
};

// ############################################################################################
// DEFINE SELECT OPERATION TO CHECK WAND, USER, AND DUPLICATE PURCHASE BY ID (Section B Task 2)
// ############################################################################################
module.exports.selectWandUserAndDuplicateWand = (data, callback) => {
  const SQLSTATEMENT = `
      SELECT * FROM WandShop WHERE wand_id = ?; -- Check if wand exists
      SELECT * FROM User WHERE user_id = ?; -- Check if user exists
      SELECT * FROM Vault WHERE user_id = ? AND wand_id = ?; -- Check if user already owns the wand
  `;

  const VALUES = [data.wand_id, data.user_id, data.user_id, data.wand_id];

  pool.query(SQLSTATEMENT, VALUES, callback);
};

// ######################################################################################
// DEFINE INSERT OPERATION TO ADD WAND TO VAULT AND UPDATE SKILLPOINTS (Section B Task 2)
// ######################################################################################
module.exports.insertWandIntoVaultAndUpdateSkillpoints = (data, callback) => {
  const SQLSTATEMENT = `
      START TRANSACTION;

      -- Deduct skillpoints from the user
      UPDATE User
      SET skillpoints = ?
      WHERE user_id = ?;

      -- Check if the user already owns the wand
      SELECT COUNT(*) AS count FROM Vault WHERE user_id = ? AND wand_id = ?;

      -- Insert the wand into the Vault if it doesn't already exist
      INSERT INTO Vault (user_id, wand_id, potion_id, spell_id, potion_quantity)
      VALUES (?, ?, NULL, NULL, 0)
      ON DUPLICATE KEY UPDATE wand_id = wand_id;

      COMMIT;
  `;

  const VALUES = [
      data.updated_skillpoints, // Updated skillpoints for the user
      data.user_id, // User ID for skillpoints deduction
      data.user_id, // User ID to check for existing entry in Vault
      data.wand_id, // Wand ID to check for existing entry in Vault
      data.user_id, // User ID to insert new entry
      data.wand_id // Wand ID to insert into new entry
  ];

  pool.query(SQLSTATEMENT, VALUES, callback);
};
  
// ######################################################################################
// DEFINE INSERT OPERATION TO UPDATE SKILLPOINTS AND ADD WAND TO VAULT (Section B Task 1)
// ######################################################################################
module.exports.insertWandIntoVaultAndUpdateSkillpoints = (data, callback) => {
  const SQLSTATEMENT = `
    START TRANSACTION;

    -- Deduct skillpoints from the user
    UPDATE User
    SET skillpoints = ?
    WHERE user_id = ?;

    -- Add the purchased wand to the user's vault
    INSERT INTO Vault (user_id, wand_id)
    VALUES (?, ?);

    COMMIT;
  `;

  const VALUES = [
      data.updated_skillpoints, // Deducted skillpoints
      data.user_id, // User ID for skillpoints deduction
      data.user_id, // User ID for vault entry
      data.wand_id // Wand ID to insert
  ];

  pool.query(SQLSTATEMENT, VALUES, callback);
};

  // #############################################################################################
  // DEFINE SELECT OPERATION TO SELECT WAND, USER, AND CHECK FOR DUPLICATE WAND (Section B Task 1)
  // #############################################################################################
  module.exports.selectWandUserAndDuplicateWand = (data, callback) => {
    const SQLSTATEMENT = `
      SELECT * FROM WandShop WHERE wand_id = ?;  -- Check if wand exists
      SELECT * FROM User WHERE user_id = ?;     -- Check if user exists
      SELECT * FROM Vault WHERE user_id = ? AND wand_id = ?;  -- Check if user already owns the wand
    `;
  
    const VALUES = [data.wand_id, data.user_id, data.user_id, data.wand_id];
  
    pool.query(SQLSTATEMENT, VALUES, callback);
  };  

// #####################################################################################
// DEFINE SELECT OPERATION TO RETRIEVE ALL POTIONS IN THE POTION SHOP (Section B Task 3)
// #####################################################################################
module.exports.selectAllPotions = (callback) => {
  const SQLSTATEMENT = `
    SELECT *
    FROM PotionShop;
  `;

  pool.query(SQLSTATEMENT, callback);
};

// #########################################################################
// DEFINE SELECT OPERATION TO CHECK POTION AND USER BY ID (Section B Task 4)
// #########################################################################
module.exports.selectPotionAndUserById = (data, callback) => {
  const SQLSTATEMENT = `
      SELECT * FROM PotionShop WHERE potion_id = ?; -- Check if potion exists
      SELECT * FROM User WHERE user_id = ?; -- Check if user exists
  `;

  const VALUES = [data.potion_id, data.user_id];

  pool.query(SQLSTATEMENT, VALUES, callback);
};

// ########################################################################################
// DEFINE INSERT OPERATION TO ADD POTION TO VAULT AND UPDATE SKILLPOINTS (Section B Task 4)
// ########################################################################################
module.exports.insertPotionIntoVaultAndUpdateSkillpoints = (data, callback) => {
  const SQLSTATEMENT = `
    START TRANSACTION;

    -- Deduct skillpoints from the user
    UPDATE User
    SET skillpoints = ?
    WHERE user_id = ?;

    -- Add or update the purchased potion in the user's vault
    INSERT INTO Vault (user_id, potion_id, potion_quantity)
    VALUES (?, ?, 1)
    ON DUPLICATE KEY UPDATE 
        potion_quantity = potion_quantity + 1;

    COMMIT;
  `;

  const VALUES = [
      data.updated_skillpoints, // Deducted skillpoints
      data.user_id, // User ID for skillpoints deduction
      data.user_id, // User ID for vault entry
      data.potion_id // Potion ID to insert or update
  ];

  pool.query(SQLSTATEMENT, VALUES, callback);
};

// ###############################################################################
// DEFINE SELECT OPERATION TO RETRIEVE ALL SPELLS IN SPELL SHOP (Section B Task 5)
// ###############################################################################
module.exports.selectAllSpells = (callback) => {
  const SQLSTATEMENT = `
    SELECT *
    FROM SpellShop;
  `;

  pool.query(SQLSTATEMENT, callback);
};

// ###########################################################################
// DEFINE SELECT OPERATION TO RETRIEVE SPELL AND USER BY ID (Section B Task 1)
// ###########################################################################
module.exports.selectSpellAndUserById = (data, callback) => {
  const SQLSTATEMENT = `
    SELECT * FROM SpellShop WHERE spell_id = ?;
    SELECT * FROM User WHERE user_id = ?;
  `;

  const VALUES = [data.spell_id, data.user_id];

  pool.query(SQLSTATEMENT, VALUES, callback);
};

// #############################################################################################
// DEFINE SELECT OPERATION TO CHECK SPELL, USER, AND DUPLICATE PURCHASE BY ID (Section B Task 6)
// #############################################################################################
module.exports.selectSpellUserAndDuplicateSpell = (data, callback) => {
  const SQLSTATEMENT = `
      SELECT * FROM SpellShop WHERE spell_id = ?; -- Check if spell exists
      SELECT * FROM User WHERE user_id = ?; -- Check if user exists
      SELECT * FROM Vault WHERE user_id = ? AND spell_id = ?; -- Check if user already owns the spell
  `;

  const VALUES = [data.spell_id, data.user_id, data.user_id, data.spell_id];

  pool.query(SQLSTATEMENT, VALUES, callback);
};

// #######################################################################################
// DEFINE INSERT OPERATION TO ADD SPELL TO VAULT AND UPDATE SKILLPOINTS (Section B Task 1)
// #######################################################################################
module.exports.insertSpellIntoVaultAndUpdateSkillpoints = (data, callback) => {
  const SQLSTATEMENT = `
    START TRANSACTION;

    -- Deduct skillpoints from the user
    UPDATE User
    SET skillpoints = ?
    WHERE user_id = ?;

    -- Add the purchased spell to the user's vault
    INSERT INTO Vault (user_id, spell_id)
    VALUES (?, ?);

    COMMIT;
  `;

  const VALUES = [
      data.updated_skillpoints, // Deducted skillpoints
      data.user_id, // User ID for skillpoints deduction
      data.user_id, // User ID for vault entry
      data.spell_id // Spell ID to insert
  ];

  pool.query(SQLSTATEMENT, VALUES, callback);
};