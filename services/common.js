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
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZmY3MWMxMWE5NmQ5ZWMwOWNmNGE1YiIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjk0NTM2MTgyfQ.JSStwPzuGuaLUBGgZqqk6T-HuBSvbrLdL9ygU_Ao4k8";
  return token;
};
exports.SECRET_KEY = "secret";
