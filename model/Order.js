const mongoose = require("mongoose");
const { Schema } = mongoose;
const orderSchema = new Schema({
  cartItems: {
    type: [Schema.Types.Mixed],
    required: true,
  },
  totalItems: {
    type: Number,
    required: true,
  },
  subTotal: {
    type: Number,
    required: true,
  },
  paymentMethod: {
    type: "string",
    required: true,
  },
  status: {
    type: "string",
    required: true,
    default: "pending",
  },
  selectedAddress: {
    type: Schema.Types.Mixed,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

const virtual = orderSchema.virtual("id");
virtual.get(function () {
  return this._id;
});

orderSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

exports.Order = mongoose.model("Order", orderSchema);
