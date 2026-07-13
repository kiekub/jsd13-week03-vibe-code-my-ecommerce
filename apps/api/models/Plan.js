const mongoose = require('mongoose');

const planSchema = new mongoose.Schema({
  plan_name: { type: String, required: true, enum: ['monthly', 'weekly', 'daily'] },
  duration: { type: Number, required: true },
  price: { type: Number, required: true }
});

module.exports = mongoose.model('Plan', planSchema);
