const mongoose = require('mongoose');

const hostSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  gender: { type: String, required: true, enum: ['เคะ', 'เมะ'] },
  personality: { type: String, required: true },
  rating: { type: Number, default: 5.0 },
  host_status: { type: String, required: true, enum: ['active', 'busy'], default: 'active' }
});

module.exports = mongoose.model('Host', hostSchema);
