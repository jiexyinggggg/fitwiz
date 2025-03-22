// ##############################################################
// REQUIRE MODULES
// ##############################################################
const pool = require("../services/db.js");

// ##################################################################
// DEFINE INSERT OPERATION TO CREATE NEW REVIEW (Section B Task 21)
// ##################################################################
module.exports.insertReview = (data, callback) => {
    const SQLSTATEMENT = `
        INSERT INTO Review (user_id, name, email, comment, rating)
        VALUES (?, ?, ?, ?, ?);
    `;

    const VALUES = [data.user_id, data.name, data.email, data.comment, data.rating];
    pool.query(SQLSTATEMENT, VALUES, callback);
};

// ####################################################################
// DEFINE SELECT OPERATION TO RETRIEVE ALL REVIEW (Section B Task 22)
// ####################################################################
module.exports.selectAllReview = (callback) => {
    const SQLSTATEMENT = `
        SELECT * 
        FROM Review
        ORDER BY submitted_at DESC;
    `;

    pool.query(SQLSTATEMENT, callback);
};

// ####################################################################################
// DEFINE SELECT OPERATION TO RETRIEVE REVIEW FOR A SPECIFIC USER (Section B Task 23)
// ####################################################################################
module.exports.selectReviewByUser = (data, callback) => {
    const SQLSTATEMENT = `
        SELECT *
        FROM Review
        WHERE user_id = ?;
    `;

    const VALUES = [data.user_id];
    pool.query(SQLSTATEMENT, VALUES, callback);
};

// #############################################################################
// DEFINE SELECT OPERATION TO CHECK REVIEW EXISTENCE BY ID (Section B Task 24)
// #############################################################################
module.exports.checkReviewExistence = (data, callback) => {
    const SQLSTATEMENT = `
        SELECT * 
        FROM Review
        WHERE review_id = ?;
    `;

    const VALUES = [data.review_id];
    pool.query(SQLSTATEMENT, VALUES, callback);
};

// #######################################################################
// DEFINE SELECT OPERATION TO CHECK REVIEW OWNERSHIP (Section B Task 24)
// #######################################################################
module.exports.checkUserOwnership = (data, callback) => {
    const SQLSTATEMENT = `
        SELECT * 
        FROM Review
        WHERE review_id = ? AND user_id = ?;
    `;

    const VALUES = [data.review_id, data.user_id];
    pool.query(SQLSTATEMENT, VALUES, callback);
};

// #######################################################################
// DEFINE UPDATE OPERATION TO MODIFY EXISTING REVIEW (Section B Task 24)
// #######################################################################
module.exports.updateReviewById = (data, callback) => {
    const SQLSTATEMENT = `
        UPDATE Review
        SET name = ?, email = ?, comment = ?, rating = ?
        WHERE review_id = ?;
    `;

    const VALUES = [data.name, data.email, data.comment, data.rating, data.review_id];
    pool.query(SQLSTATEMENT, VALUES, callback);
};

// ####################################################################
// DEFINE DELETE OPERATION TO DELETE REVIEW BY ID (Section B Task 25)
// ####################################################################
module.exports.deleteReviewById = (data, callback) => {
    const SQLSTATEMENT = `
        DELETE FROM Review
        WHERE review_id = ?;
    `;

    const VALUES = [data.review_id];
    pool.query(SQLSTATEMENT, VALUES, callback);
};