const { User } = require("../model/User");
const crypto = require("crypto");
const { sanitizeUser, SECRET_KEY } = require("../services/common");
const jwt = require("jsonwebtoken");
exports.createUser = async (req, res) => {
  try {
    var salt = crypto.randomBytes(16);
    crypto.pbkdf2(
      `${req.body.password}`,
      salt,
      310000,
      32,
      "sha256",
      async function (err, hashedPassword) {
        if (err) {
          res.status(400).json(err);
        }
        const user = new User({ ...req.body, password: hashedPassword, salt });
        const doc = await user.save();
        req.login(sanitizeUser(doc), (err) => {
          if (err) {
            res.status(400).json(err);
          } else {
            const token = jwt.sign(sanitizeUser(doc), SECRET_KEY);
            res
              .cookie("jwt", token, {
                expires: new Date(Date.now() + 3600000),
                httpOnly: true,
              })
              .json(token);
          }
        });
      }
    );
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.loginUser = async (req, res) => {
  res
    .cookie("jwt", req.user.token, {
      expires: new Date(Date.now() + 3600000),
      httpOnly: true,
    })
    .json(req.user.token);
};
exports.checkUser = async (req, res) => {
  res.status(200).json({ status: "success", user: sanitizeUser(req.user) });
};
