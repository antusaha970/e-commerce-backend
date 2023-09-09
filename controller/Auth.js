const { User } = require("../model/User");
const crypto = require("crypto");

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
        console.log(hashedPassword);
        console.log(salt);
        if (err) {
          res.status(400).json(err);
        }
        const user = new User({ ...req.body, password: hashedPassword, salt });
        const doc = await user.save();
        res.status(201).json({ id: doc.id, role: doc.role });
      }
    );
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.loginUser = async (req, res) => {
  res.status(200).json(req.user);
};
exports.checkUser = async (req, res) => {
  res.status(200).json(req.user);
};
