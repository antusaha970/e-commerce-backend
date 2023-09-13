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
  //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MDFiYzc5ZWE1M2UxZmE3MjY2NDdhOSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjk0NjEyNjAzfQ.mqouTvk9iV_-JdIyfhW4P4csna5lYiG0cxtIF7F5YLE";
  console.log({ token });
  console.log(req.cookies);
  return token;
};
exports.SECRET_KEY = "secret";
