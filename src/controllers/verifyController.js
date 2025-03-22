// ############################################
// CONTROLLER FOR TOKEN VERIFICATION
// ############################################
module.exports.showTokenVerified = (req, res, next) => {
  res.status(200).json({
      userId: res.locals.userId,
      message: "Token is verified."
  });
}