// ##############################################################
// REQUIRE MODULES
// ##############################################################
const model = require("../models/houseModel.js");

// ##############################################################################
// DEFINE CONTROLLER FUNCTION TO RETRIEVE ALL HOGWARTS HOUSES (Section B Task 16)
// ##############################################################################
module.exports.getAllHouses = (req, res, next) => {
    const callback = (error, results) => {
        if (error) {
            console.error("Error getAllHouses:", error);
            res.status(500).json(error);
        } else if (results.length === 0) {
            res.status(404).json({
                message: "No houses found in the database.",
            });
        } else {
            res.status(200).json(results);
        }
    };

    model.selectAllHouses(callback);
};

// ##############################################################################################
// DEFINE CONTROLLER FUNCTION TO CHECK IF USER IS ALREADY SORTED INTO A HOUSE (Section B Task 17)
// ##############################################################################################
module.exports.checkIfAlreadySorted = (req, res, next) => {
    const userId = res.locals.user_id; // Retrieved from the previous middleware

    const data = {
        user_id: userId,
    };

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error checkIfAlreadySorted:", error);
            res.status(500).json(error);
        } else if (results.length > 0) {
            res.status(409).json({
                message: "User has already been sorted into a house!",
            });
        } else {
            next();
        }
    };

    model.checkIfUserSorted(data, callback);
};

// ########################################################################
// DEFINE CONTROLLER FUNCTION TO ASSIGN USER TO A HOUSE (Section B Task 17)
// ########################################################################
module.exports.assignUserToHouse = (req, res, next) => {
    const userId = res.locals.user_id;
    const houseId = req.body.houseId;

    if (!userId || !houseId) {
        return res.status(400).json({
            message: "userId or houseId is undefined. Both are required.",
        });
    }

    if (![1, 2, 3, 4].includes(houseId)) {
        return res.status(400).json({
            message: "Invalid houseId. Valid options are 1 (Gryffindor), 2 (Hufflepuff), 3 (Ravenclaw), 4 (Slytherin).",
        });
    }

    const data = {
        user_id: userId,
        house_id: houseId,
    };

    const callback = (error, results) => {
        if (error) {
            console.error("Error assignUserToHouse:", error);
            return res.status(500).json(error);
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({
                message: "User does not exist, or user has already been sorted into a house.",
            });
        }

        res.locals.user_id = userId;
        res.locals.house_id = houseId;
        next(); // Proceed to fetch the house name
    };

    model.assignUserToHouse(data, callback);
};

// ############################################################################
// DEFINE CONTROLLER FUNCTION TO READ USER'S ASSIGNED HOUSE (Section B Task 17)
// ############################################################################
module.exports.getUserAssignedHouse = (req, res) => {
    const data = {
        house_id: res.locals.house_id, // Passed from the previous middleware
    };

    const callback = (error, results) => {
        if (error) {
            console.error("Error getUserAssignedHouse:", error);
            return res.status(500).json(error);
        }

        const houseName = results[0]?.house_name || "Unknown";

        return res.status(201).json({
            message: `${houseName}`,
            user_id: res.locals.user_id,
            house_id: res.locals.house_id,
        });
    };

    model.getHouseNameById(data, callback);
};

// ##################################################################################
// DEFINE CONTROLLER FUNCTION TO RETRIEVE USER'S HOUSE BY USER ID (Section B Task 18)
// ##################################################################################
module.exports.getUserHouse = (req, res, next) => {
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

    const callback = (error, results) => {
        if (error) {
            console.error("Error getUserHouse:", error);
            res.status(500).json(error);
        } else if (results.length === 0) {
            res.status(404).json({
                message: "User has not been sorted into a house yet.",
            });
        } else {
            res.status(200).json({
                user_id: userId,
                house: results[0].house_name,
                sorted_at: results[0].sorted_at,
            });
        }
    };

    model.selectUserHouse(data, callback);
};