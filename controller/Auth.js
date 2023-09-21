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
              .json({ id: doc.id, role: doc.role });
          }
        });
      }
    );
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.loginUser = async (req, res) => {
  const user = req.user;
  res
    .cookie("jwt", user.token, {
      expires: new Date(Date.now() + 3600000),
      httpOnly: true,
    })
    .json({ id: user.id, role: user.role });
};
exports.checkUser = async (req, res) => {
  if (req.user) {
    res.json(req.user);
  } else {
    req.sendStatus(401);
  }
};

exports.logOutUser = async (req, res) => {
  try {
    // Clear the session
    await new Promise((resolve, reject) => {
      req.session.destroy((err) => {
        if (err) {
          console.error("Error destroying session:", err);
          reject(err);
        } else {
          resolve();
        }
      });
    });

    // Clear the cookie
    res.clearCookie("jwt");
    res.status(200).json({ status: "logged out successfully" }); // Redirect to your login page
  } catch (error) {
    console.error("Logout error:", error);
    // Handle any errors
    res.status(500).send("Logout error");
  }
};
