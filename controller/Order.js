const { Cart } = require("../model/Cart");
const { Order } = require("../model/Order");

exports.createOrder = async (req, res) => {
  try {
    const order = new Order(req.body);
    const doc = await order.save();
    const result = await doc.populate("user");
    res.status(201).json(result);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

exports.fetchUserOrders = async (req, res) => {
  const { user } = req.query;
  try {
    const orders = await Order.find({ user: user }).populate("user");
    res.status(200).json(orders);
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.deleteFromCart = async (req, res) => {
  const { id } = req.params;
  try {
    const doc = await Cart.findByIdAndDelete(id);
    res.status(200).json(doc);
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.updateCartById = async (req, res) => {
  const { id } = req.params;
  try {
    const item = await Cart.findByIdAndUpdate(id, req.body, {
      new: true,
    })
      .populate("user")
      .populate("product");
    res.status(200).json(item);
  } catch (error) {
    res.status(400).json(error);
  }
};
