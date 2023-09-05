const { User } = require("../model/User");

exports.createUser = async (req, res) => {
  try {
    const user = new User(req.body);
    const doc = await user.save();
    res.status(201).json(doc);
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.loginUser = async (req, res) => {
  try {
    const userEmail = req.body.email;
    const userPassword = req.body.password;
    const user = await User.findOne({ email: userEmail });
    if (!user) {
      res.status(401).json({ status: "user not found" });
    } else if (user.password === userPassword) {
      res.status(200).json(user);
    } else {
      res.status(401).json({ status: "invalid credentials" });
    }
  } catch (error) {
    res.status(400).json(error);
  }
};
