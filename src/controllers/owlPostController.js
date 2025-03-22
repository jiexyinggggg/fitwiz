// ##############################################################
// REQUIRE MODULES
// ##############################################################
const model = require("../models/owlPostModel.js");

// #################################################################
// DEFINE CONTROLLER FUNCTION TO SUBMIT REVIEW (Section B Task 21)
// #################################################################
module.exports.submitReview = (req, res) => {
    const data = {
        user_id: res.locals.user_id,
        name: req.body.name,
        email: req.body.email,
        comment: req.body.comment,
        rating: req.body.rating,
    };

    if (data.rating < 1 || data.rating > 5) {
        return res.status(400).json({
            message: "Rating must be between 1 and 5.",
        });
    }

    const callback = (error, results) => {
        if (error) {
            console.error("Error submitReview:", error);
            return res.status(500).json(error);
        }

        res.status(201).json({
            message: "Review submitted successfully!",
            review_id: results.insertId,
        });
    };

    model.insertReview(data, callback);
};

// #######################################################################
// DEFINE CONTROLLER FUNCTION TO RETRIEVE ALL REVIEW (Section B Task 22)
// #######################################################################
module.exports.getAllReview = (req, res) => {
    const callback = (error, results) => {
        if (error) {
            console.error("Error getAllReview:", error);
            return res.status(500).json(error);
        } else if (results.length === 0) {
            res.status(404).json({
                message: "No review found in the database."
            });
        } else {
            res.status(200).json(results);
        }
    };

    model.selectAllReview(callback);
};

// #######################################################################################
// DEFINE CONTROLLER FUNCTION TO RETRIEVE REVIEW FOR A SPECIFIC USER (Section B Task 23)
// #######################################################################################
module.exports.getUserReview = (req, res, next) => {
    const userId = res.locals.user_id;

    const data = {
        user_id: userId
    };

    const callback = (error, results) => {
        if (error) {
            console.error("Error getUserReview:", error);
            return res.status(500).json(error);
        } else if (results.length === 0) {
            res.status(404).json({
                message: "No review found for this user."
            });
        } else {
            res.status(200).json(results);
        }
    };

    model.selectReviewByUser(data, callback);
};

// ##########################################################################
// DEFINE CONTROLLER FUNCTION TO CHECK REVIEW EXISTENCE (Section B Task 24)
// ##########################################################################
module.exports.checkReviewExistence = (req, res, next) => {
    const reviewId = req.body.reviewId;

    if (!reviewId) {
        return res.status(400).json({
            message: "reviewId is undefined."
        })
    }

    const data = {
        review_id: reviewId
    };

    const callback = (error, results) => {
        if (error) {
            console.error("Error checkReviewExistence:", error);
            return res.status(500).json(error);
        }

        if (results.length === 0) {
            return res.status(404).json({
                message: "Review not found!"
            });
        }
        else {
            res.locals.name = results[0].name;
            res.locals.email = results[0].email;
            res.locals.comment = results[0].comment;
            res.locals.rating = results[0].rating;
            next();
        }
    };

    model.checkReviewExistence(data, callback);
}

// ######################################################################################
// DEFINE CONTROLLER FUNCTION TO CHECK USER ID AGAINST REVIEW OWNER (Section B Task 24)
// ######################################################################################
module.exports.checkUserOwnership = (req, res, next) => {
    const userId = res.locals.user_id;
    const reviewId = req.body.reviewId || req.params.reviewId;

    if (!userId ) {
        return res.status(400).json({
            message: "userId is undefined"
        });
    }

    const data = {
        user_id: userId,
        review_id: reviewId
    };

    const callback = (error, results) => {
        if (error) {
            console.error("Error checkUserOwnership:", error);
            return res.status(500).json(error);
        }
        else {
            if (results.length === 0) {
                return res.status(403).json({
                    message: "User does not own this review!"
                });
            }
            else {
                next();
            }
        }
    };

    model.checkUserOwnership(data, callback);
};

// ##########################################################################
// DEFINE CONTROLLER FUNCTION TO UPDATE EXISTING REVIEW (Section B Task 24)
// ##########################################################################
module.exports.updateReview = (req, res) => {
    const reviewId = req.body.reviewId;
    const updatedData = {
        name: req.body.name,
        email: req.body.email,
        comment: req.body.comment,
        rating: req.body.rating,
    };

    if (!updatedData.name || !updatedData.email || !updatedData.comment || !updatedData.rating) {
        return res.status(400).json({
            message: "Name, email, comment, and rating are required.",
        });
    }

    if (updatedData.rating < 1 || updatedData.rating > 5) {
        return res.status(400).json({
            message: "Rating must be between 1 and 5.",
        });
    }

    const currentReview = res.locals.review; // Example: { name, email, comment, rating }

    if (
        updatedData.comment === res.locals.comment &&
        updatedData.rating === res.locals.rating &&
        updatedData.name === res.locals.name &&
        updatedData.email === res.locals.email
    ) {
        return res.status(409).json({
            message: "No changes were made to the review.",
        });
    }

    const data = {
        review_id: reviewId,
        name: updatedData.name,
        email: updatedData.email,
        comment: updatedData.comment,
        rating: updatedData.rating,
    };

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error updateReview:", error);
            return res.status(500).json(error);
        } else {
            return res.status(200).json({
                message: "Review updated successfully!",
            });
        }
    };

    model.updateReviewById(data, callback);
};

// #################################################################
// DEFINE CONTROLLER FUNCTION TO DELETE REVIEW (Section B Task 25)
// #################################################################
module.exports.deleteReview = (req, res) => {
    const reviewId = req.params.reviewId;

    if (!reviewId || isNaN(reviewId)) {
        return res.status(400).json({
            message: "Invalid or missing reviewId.",
        });
    }

    const data = {
        review_id: reviewId
    };

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error deleteReview:", error);
            return res.status(500).json(error);
        } else if (results.affectedRows === 0) {
            return res.status(404).json({
                message: "Review not found!",
            });
        } else {
            return res.status(204).send();
        }
    };

    model.deleteReviewById(data, callback);
};