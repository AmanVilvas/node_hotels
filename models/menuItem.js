const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  taste: {
    type: String,
    enum: ['sweet', 'spicy', 'sour'],
  },
  is_drink: {
    type: Boolean,
    default: false,
  },
  ingredients: {
    type: [String],
    default: [],
  },
  num_sales: {
    type: Number,
    default: 0,
    min: 0,
  },
});
 
//commendt added

const MenuItem = mongoose.model('MenuItem', menuItemSchema);
module.exports = MenuItem;
