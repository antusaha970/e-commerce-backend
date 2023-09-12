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

exports.fetchUserInfoById = async (req, res) => {
  const { id } = req.user;
  try {
    const user = await User.findById(id);
    res.status(201).json({
      id: user.id,
      role: user.role,
      addresses: user.addresses,
      orders: user.orders,
      email: user.email,
    });
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.updateUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndUpdate(id, req.body, { new: true });
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json(error);
  }
};
