const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  booking_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking', required: true },
  session_date: { type: Date, required: true },
  bedtime_status: { type: String, required: true, enum: ['completed', 'missed'] },
  wake_status: { type: String, required: true, enum: ['completed', 'missed'] },
  confirmation_status: { type: String, required: true, enum: ['confirmed', 'pending', 'cancelled'] },
  sleep_duration: { type: Number, default: null }
});

module.exports = mongoose.model('Session', sessionSchema);
