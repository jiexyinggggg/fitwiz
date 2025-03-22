// ##############################################################
// REQUIRE MODULES
// ##############################################################
const pool = require("../services/db");

// #################################################################################
// DEFINE SELECT OPERATION FOR RETRIEVING ITEMS IN USER VAULT (Section B Task 7)
// #################################################################################
module.exports.selectAllItems = (data, callback) => {
  const SQLSTATEMENT = `
      SELECT * FROM User WHERE user_id = ?;
      SELECT * FROM Vault WHERE user_id = ?;
  `;  
  const VALUES = [data.user_id, data.user_id];  
  pool.query(SQLSTATEMENT, VALUES, callback);
};

// ################################################################################
// DEFINE SELECT OPERATION TO RETRIEVE ALL WANDS IN USER'S VAULT (Section B Task 8)
// ################################################################################
module.exports.selectUserAndWandsInVault = (data, callback) => {
  const SQLSTATEMENT = `
      SELECT * FROM User WHERE user_id = ?;
      SELECT Vault.wand_id, WandShop.wand_name
      FROM Vault
      JOIN WandShop ON Vault.wand_id = WandShop.wand_id
      WHERE Vault.user_id = ?;
  `;  
  const VALUES = [data.user_id, data.user_id];  
  pool.query(SQLSTATEMENT, VALUES, callback);
};

// ##################################################################################
// DEFINE SELECT OPERATION TO RETRIEVE ALL POTIONS IN USER'S VAULT (Section B Task 9)
// ##################################################################################
module.exports.selectUserAndPotionsInVault = (data, callback) => {
  const SQLSTATEMENT = `
      SELECT * FROM User WHERE user_id = ?;
      SELECT Vault.potion_id, PotionShop.potion_name, Vault.potion_quantity
      FROM Vault
      JOIN PotionShop ON Vault.potion_id = PotionShop.potion_id
      WHERE Vault.user_id = ?;
  `;  
  const VALUES = [data.user_id, data.user_id];  
  pool.query(SQLSTATEMENT, VALUES, callback);
};

// ##################################################################################
// DEFINE SELECT OPERATION TO RETRIEVE ALL SPELLS IN USER'S VAULT (Section B Task 10)
// ##################################################################################
module.exports.selectUserAndSpellsInVault = (data, callback) => {
  const SQLSTATEMENT = `
      SELECT * FROM User WHERE user_id = ?;
      SELECT Vault.spell_id, SpellShop.spell_name
      FROM Vault
      JOIN SpellShop ON Vault.spell_id = SpellShop.spell_id
      WHERE Vault.user_id = ?;
  `;  
  const VALUES = [data.user_id, data.user_id];  
  pool.query(SQLSTATEMENT, VALUES, callback);
};