// ##############################################################
// REQUIRE MODULES
// ##############################################################
const model = require("../models/leaderboardModel.js");

// ###################################################################
// DEFINE CONTROLLER FUNCTION TO READ USER'S HOUSE (Section B Task 19)
// ###################################################################
module.exports.getUserHouse = (req, res, next) => {
    const houseId = req.query.house_id ? parseInt(req.query.house_id, 10) : undefined;

    if (houseId !== undefined && ![1, 2, 3, 4].includes(houseId)) {
        return res.status(400).json({
            message: `Invalid house ID ${houseId}. Valid house IDs are 1 (Gryffindor), 2 (Hufflepuff), 3 (Ravenclaw), and 4 (Slytherin).`,
        });
    }
    
    const data = {
        houseId: houseId
    };

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error getUserHouse:", error);
            res.status(500).json(error);
        }

        else {
            const houseName = results[0];

            if (!houseName) {
                res.locals.houseId = houseId;
                next();
            }
            else {
                res.locals.houseId = houseId;
                res.locals.houseName = results[0].house_name;
                next();
            }
        }    
    }

    model.selectUserHouse(data, callback);
}

// #########################################################################################################
// DEFINE CONTROLLER FUNCTION TO RETRIEVE USER LEADERBOARD WITH OPTIONAL FILTER BY HOUSE (Section B Task 19)
// #########################################################################################################
module.exports.getUserLeaderboard = (req, res, next) => {
    const houseId = res.locals.houseId; 

    const data = houseId ? { house_id: houseId } : {}; // Pass house_id if filtering by house

    const callback = (error, results) => {
        if (error) {
            console.error("Error getUserLeaderboard:", error);
            return res.status(500).json(error);
        } 

        else {
            if (results.length == 0) {
                res.status(404).json({
                    message: `No users sorted into ${res.locals.houseName}`
                });
                return;
            }
            else {
                res.status(200).json(results);
                return;
            }
        }
    };

    model.selectUserLeaderboard(data, callback);
};

// ############################################################################
// DEFINE CONTROLLER FUNCTION TO RETRIEVE HOUSE LEADERBOARD (Section B Task 20)
// ############################################################################
module.exports.getHouseLeaderboard = (req, res) => {
    const callback = (error, results) => {
        if (error) {
            console.error("Error getHouseLeaderboard:", error);
            res.status(500).json(error);
        } else if (results.length === 0) {
            res.status(404).json({
                message: "No houses found in the database.",
            });
        } else {
            res.status(200).json({
                leaderboard: results, // Returns houses sorted by cumulative skillpoints
            });
        }
    };

    model.selectHouseLeaderboard(callback);
};