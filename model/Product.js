const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: [0, "Minimum price is 0"],
  },
  discountPercentage: {
    type: Number,
    required: true,
    min: [0, "Minimum discount percentage is 0"],
    max: [100, "Maximum discount percentage is 100"],
  },
  rating: {
    type: Number,
    required: true,
    min: [0, "Minimum rating is 0"],
    max: [5, "Maximum rating is 5"],
    default: 0,
  },
  stock: {
    type: Number,
    required: true,
    min: [0, "Minimum stock is 0"],
  },
  brand: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  images: {
    type: [String],
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const virtual = productSchema.virtual("id");
virtual.get(function () {
  return this._id;
});

productSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

exports.Product = mongoose.model("Product", productSchema);
