// ##############################################################
// REQUIRE MODULES
// ##############################################################
const model = require("../models/duelModel.js");

// ####################################################################
// DEFINE CONTROLLER FUNCTION TO READ ALL CREATURES (Section B Task 11)
// ####################################################################
module.exports.readAllCreatures = (req, res, next) => {
  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error readAllCreatures:", error);
      res.status(500).json(error);
    }

    else {
      res.status(200).json(results);
    }
  }

  model.selectAllCreatures(callback);
}

// ###########################################################################
// DEFINE CONTROLLER FUNCTION TO CHECK FOR DUPLICATE DUELS (Section B Task 12)
// ###########################################################################
module.exports.checkDuplicateDuel = (req, res, next) => {
  const userId = res.locals.user_id;
  const creatureId = req.body.creatureId;
  if (!userId || !creatureId) {
    res.status(400).json({
      message: "userId or creatureId is undefined.",
    });
    return;
  }

  const data = { user_id: userId, creature_id: creatureId };

  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error checkDuplicateDuel:", error);
      res.status(500).json(error);
    } else if (results.length > 0) {
      res.status(409).json({
        message: "User already has an ongoing duel. Please complete it before starting a new one.",
      });
    } else {
      res.locals.userId = res.locals.user_id;
      res.locals.creatureId = req.body.creatureId;
      next();
    }
  };

  model.selectOngoingDuel(data, callback);
};

// #################################################################################
// DEFINE CONTROLLER FUNCTION TO CHECK USER ELIGIBILITY FOR DUEL (Section B Task 12)
// #################################################################################
module.exports.checkUserEligibility = (req, res, next) => {
  const userId = res.locals.userId;

  if (!userId) {
    res.status(400).json({
      message: "userId is undefined.",
    });
    return;
  }

  const data = { user_id: userId };

  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error checkUserEligibility:", error);
      res.status(500).json(error);
    } else if (results.length === 0) {
      res.status(404).json({
        message: "User does not exist or does not meet the requirements for the duel.",
      });
    } else {
      const user = results[0];

      if (user.skillpoints < 20) {
        res.status(400).json({
          message: "User does not have enough skillpoints to start the duel. Minimum required is 20.",
        });
      } else if (!user.wand_id) {
        res.status(400).json({
          message: "User must have a wand in their vault to start a duel.",
        });
      } else if ((!user.potion_quantity || user.potion_quantity === '0') && (!user.spell_id || user.spell_id === '0')) {
        res.status(400).json({
          message: "User must have at least one potion or one spell in their vault to start a duel.",
        });
      } else {
        next();
      }
    }
  };

  model.selectUserEligibility(data, callback);
};

// #####################################################################################
// DEFINE CONTROLLER FUNCTION TO DEDUCT INITIAL SKILLPOINTS FOR DUEL (Section B Task 12)
// #####################################################################################
module.exports.deductInitialSkillpoints = (req, res, next) => {
  const userId = res.locals.userId;
  if (!userId) {
    res.status(400).json({
      message: "userId is undefined.",
    });
    return;
  }

  const data = { user_id: userId };

  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error deductInitialSkillpoints:", error);
      res.status(500).json(error);
    } else if (results.affectedRows === 0) {
      res.status(404).json({
        message: "User does not exist! Cannot deduct skillpoints.",
      });
    } else {
      next();
    }
  };

  model.deductSkillpointsForDuel(data, callback);
};

// ######################################################################
// DEFINE CONTROLLER FUNCTION TO READ CREATURE HEALTH (Section B Task 12)
// ######################################################################
module.exports.readCreatureHealth = (req, res, next) => {
  const creatureId = res.locals.creatureId;

  const data = {
    creature_id: creatureId
  };

  const callback = (error, results, fields) => {
    if (error){
      console.error("Error readCreatureHealth:", error);
      res.status(500).json(error);
    }

    else {
      res.locals.creatureHealth = results[0].creature_health;
      next();
    }
  }

  model.readCreatureHealth(data, callback);
}

// ############################################################################
// DEFINE CONTROLLER FUNCTION TO CREATE INITIAL DUEL RECORD (Section B Task 12)
// ############################################################################
module.exports.createDuelRecord = (req, res, next) => {
  const userId = res.locals.userId;
  const creatureId = res.locals.creatureId;

  if (!userId || !creatureId) {
    res.status(400).json({
      message: "userId or creatureId is undefined.",
    });
    return;
  }

  const data = {
    user_id: userId,
    creature_id: creatureId,
    result: 4,
    user_health: 100, // Default initial user health
    creature_health: res.locals.creatureHealth,
  };

  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error createDuelRecord:", error);
      res.status(500).json(error);
    } else {
      res.status(201).json({
        duel_id: results.insertId,
        user_id: res.locals.userId,
        user_health: data.user_health,
        creature_id: res.locals.creatureId,
        creature_health: data.creature_health,
        status: "Duel Started",
      });
    }
  };

  model.insertDuelRecord(data, callback);
};

// #################################################################
// DEFINE CONTROLLER FUNCTION TO READ DUEL BY ID (Section B Task 13)
// #################################################################
module.exports.readDuelById = (req, res, next) => {
  const duel_id = parseInt(req.body.duelId);
  if (!duel_id || !Number.isInteger(duel_id)) {
    res.status(400).json({
      message: "Invalid Duel ID."
    });
    return;
  }

  const data = {
    duel_id: duel_id
  };

  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error readDuelById:", error);
      res.status(500).json(error);
    } else {
      if (results.length == 0) {
        res.status(404).json({
          message: "Duel not found!",
        });
        return;
      }
      else {
          res.locals.duelId = data.duelId;
          res.locals.duel = results[0];
          next();
      }
    }
  };

  model.readDuelById(data, callback);
};

// ######################################################################
// DEFINE CONTROLLER FUNCTION TO READ DAMAGE ITEM IDs (Section B Task 13)
// ######################################################################
module.exports.readDamageItemId = (req, res, next) => {
  const duel = res.locals.duel;
  const userId = duel.user_id;

  const data = {
      user_id: userId
  }

  const callback = (error, results, fields) =>{
      if (error){
          console.error("Error readDamageItemId:", error);
          res.status(500).json(error);
      }

      else {
          if (results[0].potion_id != undefined || results[0].spell_id != undefined){
            if (results[0].potion_id && results[0].spell_id){
              res.locals.potionId = results[0].potion_id;
              res.locals.spellId = results[0].spell_id;
              next();
            }

            else if (results[0].potion_id){
              res.locals.potionId = results[0].potion_id;
              next();
            }

            else {
              res.locals.spellId = results[0].spell_id;
              next();
            }
          }
         
          else {
              res.status(404).json({
                  message: "No potion or spell to attack with!"
              });
              return;
          }
      }
  }

  model.readDamageItemId(data, callback);
}

// ##########################################################################
// DEFINE CONTROLLER FUNCTION TO READ POTION DAMAGE VALUE (Section B Task 13)
// ##########################################################################
module.exports.readDamageValuePotion = (req, res, next) => {
  const data = {
      potion_id: res.locals.potionId
  };
  
  const callback = (error, results, fields) =>{
      if (error){
          console.error("Error readDamageValuePotion:", error);
          res.status(500).json(error);
      }

      else {
        if (results.length == 0){
          next();
        }
        else {
          res.locals.potionDamage = results[0].potion_damage;
          res.locals.potionHeal = results[0].potion_heal;
          next();
        }
      }
  }
  model.readDamageValuePotion(data, callback);
}

// #########################################################################
// DEFINE CONTROLLER FUNCTION TO READ SPELL DAMAGE VALUE (Section B Task 13)
// #########################################################################
module.exports.readDamageValueSpell = (req, res, next) => {
  const data = {
      spell_id: res.locals.spellId
  };

  const callback = (error, results, fields) =>{
      if (error){
          console.error("Error readDamageValueSpell:", error);
          res.status(500).json(error);
      }

      else {
        if (results.length == 0){
          next();
        }
        else {
          res.locals.spellDamage = results[0].spell_damage;
          next();
        }
      }
  }
  model.readDamageValueSpell(data, callback);
}

// ##########################################################################
// DEFINE CONTROLLER FUNCTION TO FETCH DUEL REWARD POINTS (Section B Task 13)
// ##########################################################################
module.exports.fetchDuelRewardPoints = (req, res, next) => {
  const data = {
    creature_id: res.locals.duel.creature_id
  }

  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error fetchDuelRewardPoints:", error);
      res.status(500).json(error);
    }

    else {
      res.locals.rewardPoints = results[0].reward_points;
      next();
    }
  }
  model.fetchDuelRewardPoints(data, callback);
}

// ###############################################################
// DEFINE CONTROLLER FUNCTION TO SIMULATE DUEL (Section B Task 13)
// ############################################################### 
module.exports.simulateDuelAndUpdateOutcome = (req, res, next) => {
  const duel = res.locals.duel;
  const duelId = duel.duel_id;
  const maxPotionHeal = res.locals.maxPotionHeal || 20; // Default max potion heal value is 20
  const potionDamage = res.locals.potionDamage || 0; // Default to 0 if no potion
  const spellDamage = res.locals.spellDamage || 0; // Default to 0 if no spell

  // Calculate potion healing (at least 5, up to maxPotionHeal)
  const potionHeal = Math.max(5, Math.floor(Math.random() * maxPotionHeal) + 1);

  if (duel.result !== "Started" && duel.result !== "In Progress") {
      res.status(409).json({
          message: `Duel already completed. Result: ${duel.result}`,
      });
      return;
  } else if (duel.result === "Started") {
      duel.result = "In Progress";
  }

  // Calculate the max possible damage for the user
  const maxUserDamage = spellDamage + potionDamage;

  // Calculate user damage (at least 10, up to maxUserDamage)
  const userDamage = Math.max(10, Math.floor(Math.random() * maxUserDamage) + 1);

  // Calculate creature damage (random between 10 and 30)
  const creatureDamage = Math.floor(Math.random() * 21) + 10;

  // Apply user damage to creature's health
  duel.creature_health -= userDamage;

  // Apply creature damage to user's health
  duel.user_health -= creatureDamage;

  // Heal user with randomized potion heal
  duel.user_health += potionHeal;

  // Ensure health values don't exceed limits
  duel.user_health = Math.min(100, Math.max(0, duel.user_health)); // Clamp user health between 0 and 100
  duel.creature_health = Math.max(0, duel.creature_health); // Ensure creature health doesn't drop below 0

  // Determine duel result
  let result = '';
  let skillpointsGained = 0;
  let skillpointsDeducted = 0;
  if (duel.user_health <= 0 && duel.creature_health <= 0) {
      result = 'Draw';
      skillpointsGained = 10; // Earn back points spent to start the duel
      skillpointsDeducted = 0;
  } else if (duel.user_health <= 0) {
      result = 'Lose';
      skillpointsGained = 0;
      skillpointsDeducted = 10; // Deduct points for losing
  } else if (duel.creature_health <= 0) {
      result = 'Win';
      skillpointsGained = res.locals.rewardPoints; // Award points for winning
      skillpointsDeducted = 0;
  } else {
      result = 'In Progress';
  }

  const data = {
      duel_id: duelId,
      user_health: duel.user_health,
      creature_health: duel.creature_health,
      result: result,
      skillpoints_gained: skillpointsGained,
      skillpoints_deducted: skillpointsDeducted,
  };

  const callback = (error, results) => {
      if (error) {
          console.error("Error simulateDuelAndUpdateOutcome:", error);
          res.status(500).json(error);
      } else {
          res.locals.duelResult = {
              message: `Result: ${result}`,
              user_health: data.user_health,
              creature_health: data.creature_health,
              skillpoints_gained: data.skillpoints_gained,
              skillpoints_deducted: data.skillpoints_deducted,
          };
          next();
      }
  };

  model.simulateDuelAndUpdateOutcome(data, callback);
};

// ########################################################################
// DEFINE CONTROLLER FUNCTION TO ADD DUEL REWARD POINTS (Section B Task 13)
// ########################################################################
module.exports.addDuelRewardPoints = (req, res, next) => {
  const duel = res.locals.duel
  const rewardPoints = res.locals.duelResult.skillpoints_gained || - (res.locals.duelResult.skillpoints_deducted);
  const data = {
      rewardPoints: rewardPoints,
      user_id: duel.user_id,
    };
  
    const callback = (error, results, fields) => {
      if (error) {
        console.error("Error addDuelRewardPoints:", error);
      } else {
      next();
      } 
    };
  
    model.addDuelRewardPoints(data, callback);
}

// ####################################################################
// DEFINE CONTROLLER FUNCTION TO RETRIEVE ALL DUELS (Section B Task 14)
// ####################################################################
module.exports.getAllDuels = (req, res, next) => {
  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error getAllDuels:", error);
      res.status(500).json(error);
    }

    else {
      if (results.length == 0) {
        res.status(404).json({
          message: "No duels found!"
        });
      }
      else {
        res.status(200).json(results);
      }
    }
  }

  model.getAllDuels(callback);
}

// #############################################################################
// DEFINE CONTROLLER FUNCTION TO RETRIEVE DUEL DETAILS BY ID (Section B Task 15)
// #############################################################################
module.exports.getDuelDetails = (req, res, next) => {
  const duelId = req.params.duelId;
  if (!duelId) {
    res.status(400).json({
      message: "duelId is undefined!"
    })
    return;
  };

  const data = {
    duelId: duelId
  };

  const callback = (error, results, fields) => {
      if (error) {
        console.error("Error getDuelDetails:", error);
        res.status(500).json(error);
      }
  
      else {
        if (results.length == 0) {
          res.status(404).json({
            message: "Duel not found!"
          });
        }
  
      else {
        res.status(200).json(results);
      }
    }
  }
  model.getDuelDetails(data, callback);
}