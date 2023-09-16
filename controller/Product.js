const { Product } = require("../model/Product");

exports.createProduct = async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    const doc = await newProduct.save();
    res.status(201).json(doc);
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.fetchAllFilteredProduct = async (req, res) => {
  // filter = {"category" : ["phones","laptops"]}
  // sort = {_sort: "price", order: "asc"}
  // pagination = {_page: 1, _limit: 10}
  try {
    let query = Product.find({});
    let totalDoc = Product.find({});
    if (req.query.category) {
      query = query.find({ category: req.query.category });
      totalDoc = totalDoc.find({ category: req.query.category });
    }
    if (req.query.brand) {
      query = query.find({ brand: req.query.brand });
      totalDoc = totalDoc.find({ brand: req.query.brand });
    }
    if (req.query.searchText && !req.query.category && !req.query.brand) {
      const searchQuery = {
        $or: [
          { title: { $regex: `${req.query.searchText}`, $options: "i" } }, // 'i' makes the regex case-insensitive
          { brand: { $regex: `${req.query.searchText}`, $options: "i" } },
          { category: { $regex: `${req.query.searchText}`, $options: "i" } },
        ],
      };
      query = query.find(searchQuery);
      totalDoc = totalDoc.find(searchQuery);
    }
    if (req.query._sort && req.query._order) {
      query = query.sort({ [req.query._sort]: req.query._order });
    }

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

exports.fetchProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json(error);
  }
};
exports.fetchSearchProducts = async (req, res) => {
  try {
    const { text } = req.query;
    const searchQuery = {
      $or: [
        { title: { $regex: `${text}`, $options: "i" } }, // 'i' makes the regex case-insensitive
        { brand: { $regex: `${text}`, $options: "i" } },
        { category: { $regex: `${text}`, $options: "i" } },
      ],
    };
    const products = await Product.find(searchQuery);
    const totalDocs = await Product.find(searchQuery).count();
    res.set("X-Total-Count", totalDocs);
    res.status(201).json(products);
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.updateProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json(error);
  }
};
