const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  booking_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking', required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: true }
});

module.exports = mongoose.model('Review', reviewSchema);
