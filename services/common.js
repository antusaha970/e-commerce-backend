const passport = require("passport");

exports.isAuth = (req, res, done) => {
  return passport.authenticate("jwt");
};

exports.sanitizeUser = (user) => {
  return { id: user.id, role: user.role };
};

exports.cookieExtractor = function (req) {
  var token = null;
  if (req && req.cookies) {
    token = req.cookies["jwt"];
  }
  token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MDA3ZTBhOGE4MWRiOTkwNWJlMGY0YiIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjk0NTMxMDgyfQ.eAKeqOojONkBRWnmD0bmHDMHn3kP51NHi7F0_qu4Htc";
  return token;
};
exports.SECRET_KEY = "secret";
