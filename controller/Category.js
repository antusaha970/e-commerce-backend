const { Categories } = require("../model/Category");

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Categories.find({});
    res.status(201).json(categories);
  } catch (error) {
    res.status(400).json(error);
  }
};
exports.createCategory = async (req, res) => {
  try {
    const category = new Categories(req.body);
    const doc = await category.save();
    res.status(201).json(doc);
  } catch (error) {
    res.status(400).json(error);
  }
};
