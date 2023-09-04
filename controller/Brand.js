const { Brand } = require("../model/Brand");

exports.getAllBrands = async (req, res) => {
  try {
    const brands = await Brand.find({});
    res.status(201).json(brands);
  } catch (error) {
    res.status(400).json(error);
  }
};
exports.createBrand = async (req, res) => {
  try {
    const brands = new Brand(req.body);
    const doc = await brands.save();
    res.status(201).json(doc);
  } catch (error) {
    res.status(400).json(error);
  }
};
