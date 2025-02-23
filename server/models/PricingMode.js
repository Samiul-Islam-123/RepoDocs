const mongoose = require("mongoose");

const PricingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  bolts: {
    type: String,
    required: true,
  },
  features: {
    type: [String],
    required: true,
  },
  isPopular: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const PricingModel = new mongoose.model('pricing', PricingSchema);
module.exports = PricingModel