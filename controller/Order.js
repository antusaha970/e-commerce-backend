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

exports.fetchUserOrdersById = async (req, res) => {
  const { id } = req.params;
  try {
    const orders = await Order.find({ user: id }).populate("user");
    res.status(200).json(orders);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

exports.fetchAdminProducts = async (req, res) => {
  // pagination = {_page: 1, _limit: 10}
  try {
    let query = Order.find({});
    let totalDoc = Order.find({});

    const totalDocs = await totalDoc.count().exec();

    if (req.query._page && req.query._limit) {
      const pageSize = req.query._limit;
      const page = req.query._page;
      query = query.skip(pageSize * (page - 1)).limit(pageSize);
    }

    const docs = await query.exec();
    res.set("X-Total-Count", totalDocs);
    res.status(201).json(docs);
  } catch (error) {
    console.log(error);
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

exports.updateOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order.findByIdAndUpdate(id, req.body, {
      new: true,
    }).populate("user");
    res.status(200).json(order);
  } catch (error) {
    res.status(400).json(error);
  }
};
