// ##############################################################
// REQUIRE MODULES
// ##############################################################
const model = require("../models/vaultModel.js");

// ###################################################################################
// DEFINE CONTROLLER FUNCTION TO RETRIEVE ALL ITEMS IN USER'S VAULT (Section B Task 7)
// ###################################################################################
module.exports.getAllItemsInVaultById = (req, res, next) => {
  const userId = res.locals.user_id;  
  if (!userId) {
      res.status(400).json({
          message: "userId is undefined.",
      });
      return;
  }  
  const data = {
      user_id: userId,
  };  
  const callback = (error, results, fields) => {
      if (error) {
          console.error("Error getAllItemsInVaultById:", error);
          res.status(500).json(error);
      }
      else if (results[0].length === 0) {
          res.status(404).json({
              message: "User does not exist!",
          });
      }
      else if (results[1].length === 0) {
          res.status(404).json({
              message: "The user has no items in their vault!",
          });
      } 
      else {
          res.status(200).json(results[1]);
      }
  };  
  model.selectAllItems(data, callback);
};

// ###################################################################################
// DEFINE CONTROLLER FUNCTION TO RETRIEVE ALL WANDS IN USER'S VAULT (Section B Task 8)
// ###################################################################################
module.exports.getAllWandsInVault = (req, res, next) => {
  const userId = res.locals.user_id;  
  if (!userId) {
      res.status(400).json({
          message: "userId is undefined.",
      });
      return;
  }  
  const data = {
      user_id: userId,
  };  
  const callback = (error, results, fields) => {
      if (error) {
          console.error("Error getAllWandsInVault:", error);
          res.status(500).json(error);
      } else if (results[0].length === 0) {
          res.status(404).json({
              message: "User does not exist!",
          });
      } else if (results[1].length === 0) {
          res.status(404).json({
              message: "User has no wands in their vault.",
          });
      } else {
          res.status(200).json(results[1]);
      }
  };  

  model.selectUserAndWandsInVault(data, callback);
};

// #####################################################################################
// DEFINE CONTROLLER FUNCTION TO RETRIEVE ALL POTIONS IN USER'S VAULT (Section B Task 9)
// #####################################################################################
module.exports.getAllPotionsInVault = (req, res, next) => {
  const userId = res.locals.user_id;  
  if (!userId) {
      res.status(400).json({
          message: "userId is undefined.",
      });
      return;
  }  
  const data = {
      user_id: userId,
  };  
  const callback = (error, results, fields) => {
      if (error) {
          console.error("Error getAllPotionsInVault:", error);
          res.status(500).json(error);
      } else if (results[0].length === 0) {
          res.status(404).json({
              message: "User does not exist!",
          });
      } else if (results[1].length === 0) {
          res.status(404).json({
              message: "User has no potions in their vault.",
          });
      } else {
          res.status(200).json(results[1]);
      }
  };  

  model.selectUserAndPotionsInVault(data, callback);
};

// #####################################################################################
// DEFINE CONTROLLER FUNCTION TO RETRIEVE ALL SPELLS IN USER'S VAULT (Section B Task 10)
// #####################################################################################
module.exports.getAllSpellsInVault = (req, res, next) => {
  const userId = res.locals.user_id;  
  if (!userId) {
      res.status(400).json({
          message: "userId is undefined.",
      });
      return;
  }  
  const data = {
      user_id: userId,
  };  
  const callback = (error, results, fields) => {
      if (error) {
          console.error("Error getAllSpellsInVault:", error);
          res.status(500).json(error);
      } else if (results[0].length === 0) {
          res.status(404).json({
              message: "User does not exist!",
          });
      } else if (results[1].length === 0) {
          res.status(404).json({
              message: "User has no spells in their vault.",
          });
      } else {
          res.status(200).json(results[1]);
      }
  };  
  
  model.selectUserAndSpellsInVault(data, callback);
};