// ##############################################################
// REQUIRE MODULES
// ##############################################################
const model = require("../models/diagonAlleyModel.js");

// ####################################################################################
// DEFINE CONTROLLER FUNCTION TO RETRIEVE ALL WANDS IN THE WAND SHOP (Section B Task 1)
// ####################################################################################
module.exports.getAllWandsInShop = (req, res, next) => {
  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error getAllWandsInShop:", error);
      res.status(500).json(error);
    } else res.status(200).json(results);
  };

  model.selectAllWands(callback);
};

// ##############################################################################################
// DEFINE CONTROLLER FUNCTION TO VALIDATE WAND PURCHASE BY USER ID AND WAND ID (Section B Task 2)
// ##############################################################################################
module.exports.validateWandPurchase = (req, res, next) => {
  const data = {
      wand_id: req.body.wandId,
      user_id: res.locals.user_id,
  };

  const callback = (error, results) => {
    if (error) {
        console.error("Error validateWandPurchase:", error);
        return res.status(500).json(error);
    }
    if (results[0].length === 0) {
        return res.status(404).json({
            message: "Wand not found!",
        });
    }
    if (results[1].length === 0) {
        return res.status(404).json({
            message: "User not found!", 
        });
    }
    if (results[2].length > 0) {
        return res.status(409).json({
            message: "User already owns this wand. Duplicate purchase is not allowed.",
        });
    }
    const userSkillpoints = results[1][0].skillpoints;
    const wandCost = results[0][0].wand_cost;
    if (userSkillpoints < wandCost) {
        return res.status(400).json({
            message: "User does not have enough skillpoints to purchase this wand. Please complete more challenges!",
        });
    }
    // Pass validated data to the next function
    res.locals.purchaseData = {
        user_id: data.user_id,
        wand_id: data.wand_id,
        updated_skillpoints: userSkillpoints - wandCost,
    };
    next();
  };

  model.selectWandUserAndDuplicateWand(data, callback);
};

// #######################################################################
// DEFINE CONTROLLER FUNCTION TO COMPLETE WAND PURCHASE (Section B Task 2)
// #######################################################################
module.exports.completeWandPurchase = (req, res, next) => {
  const purchaseData = res.locals.purchaseData;

  const callback = (error, results) => {
    if (error) {
        console.error("Error completeWandPurchase:", error);
        return res.status(500).json(error);
    }
    res.status(200).json({
        message: "Wand purchased successfully. Skillpoints deducted and wand added to the Vault.",
    });
  };

  model.insertWandIntoVaultAndUpdateSkillpoints(purchaseData, callback);
};

// ##################################################################################################
// DEFINE CONTROLLER FUNCTION TO RETRIEVE ALL POTIONS AVAILABLE IN THE POTION SHOP (Section B Task 3)
// ##################################################################################################
module.exports.getAllPotionsInShop = (req, res, next) => {
  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error getAllPotionsInShop:", error);
      res.status(500).json(error);
    } else {
      res.status(200).json(results);
    }
  };

  model.selectAllPotions(callback);
};

// ##################################################################################################
// DEFINE CONTROLLER FUNCTION TO VALIDATE POTION PURCHASE BY USER ID AND POTION ID (Section B Task 4)
// ##################################################################################################
module.exports.validatePotionPurchase = (req, res, next) => {
  const data = {
      potion_id: req.body.potionId,
      user_id: res.locals.user_id,
  };

  const callback = (error, results) => {
    if (error) {
        console.error("Error validatePotionPurchase:", error);
        return res.status(500).json(error);
    }
    if (results[0].length === 0) {
        return res.status(404).json({
            message: "Potion not found!",
        });
    }
    if (results[1].length === 0) {
        return res.status(404).json({
            message: "User not found!",
        });
    }
    const userSkillpoints = results[1][0].skillpoints;
    const potionCost = results[0][0].potion_cost;
    if (userSkillpoints < potionCost) {
        return res.status(400).json({
            message: "User does not have enough skillpoints to purchase this potion. Please complete more challenges!",
        });
    }
    // Pass validated data to the next function
    res.locals.purchaseData = {
        user_id: data.user_id,
        potion_id: data.potion_id,
        updated_skillpoints: userSkillpoints - potionCost,
    };
    next();
  };

  model.selectPotionAndUserById(data, callback);
};

// ##################################################################################################
// DEFINE CONTROLLER FUNCTION TO COMPLETE POTION PURCHASE BY USER ID AND POTION ID (Section B Task 4)
// ##################################################################################################
module.exports.completePotionPurchase = (req, res, next) => {
  const purchaseData = res.locals.purchaseData;

  const callback = (error, results) => {
    if (error) {
        console.error("Error completePotionPurchase:", error);
        return res.status(500).json(error);
    }
    res.status(200).json({
        message: "Potion purchased successfully. Skillpoints deducted and potion added to the Vault.",
    });
  };

  model.insertPotionIntoVaultAndUpdateSkillpoints(purchaseData, callback);
};

// ####################################################################
// DEFINE CONTROLLER FUNCTION TO RETRIEVE ALL SPELLS (Section B Task 5)
// ####################################################################
module.exports.getAllSpellsInShop = (req, res, next) => {
  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error getAllSpellsInShop:", error);
      res.status(500).json(error);
    } else res.status(200).json(results);
  };

  model.selectAllSpells(callback);
};

// ################################################################################################
// DEFINE CONTROLLER FUNCTION TO VALIDATE SPELL PURCHASE BY USER ID AND SPELL ID (Section B Task 6)
// ################################################################################################
module.exports.validateSpellPurchase = (req, res, next) => {
  const data = {
      spell_id: req.body.spellId,
      user_id: res.locals.user_id,
  };

  const callback = (error, results) => {
    if (error) {
        console.error("Error validateSpellPurchase:", error);
        return res.status(500).json(error);
    }
    if (results[0].length === 0) {
        return res.status(404).json({
            message: "Spell not found!",
        });
    }
    if (results[1].length === 0) {
        return res.status(404).json({
            message: "User not found!",
        });
    }
    if (results[2].length > 0) {
        return res.status(409).json({
            message: "User already owns this spell. Duplicate purchase is not allowed.",
        });
    }
    const userSkillpoints = results[1][0].skillpoints;
    const spellCost = results[0][0].spell_cost;
    if (userSkillpoints < spellCost) {
        return res.status(400).json({
            message: "User does not have enough skillpoints to purchase this spell. Please complete more challenges!",
        });
    }
    // Pass validated data to the next function
    res.locals.purchaseData = {
        user_id: data.user_id,
        spell_id: data.spell_id,
        updated_skillpoints: userSkillpoints - spellCost,
    };
    next();
  };

  model.selectSpellUserAndDuplicateSpell(data, callback);
};

// ################################################################################################
// DEFINE CONTROLLER FUNCTION TO COMPLETE SPELL PURCHASE BY USER ID AND SPELL ID (Section B Task 6)
// ################################################################################################
module.exports.completeSpellPurchase = (req, res, next) => {
  const purchaseData = res.locals.purchaseData;

  const callback = (error, results) => {
    if (error) {
        console.error("Error completeSpellPurchase:", error);
        return res.status(500).json(error);
    }
    res.status(200).json({
        message: "Spell purchased successfully. Skillpoints deducted and spell added to the Vault.",
    });
  };

  model.insertSpellIntoVaultAndUpdateSkillpoints(purchaseData, callback);
};