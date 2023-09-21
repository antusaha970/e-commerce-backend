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
  // token =
  //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MDA3ZTBhOGE4MWRiOTkwNWJlMGY0YiIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY5NTI5NDMzOX0.fD_ByshutzU_A3y5hCu5fe1SqHJfz6ctI1jBAtMP7Yo";
  return token;
};
exports.SECRET_KEY = "secret";
