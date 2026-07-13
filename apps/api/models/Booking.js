const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  plan_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Plan', required: true },
  host_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Host', required: true },
  schedule: {
    start_date: { type: String, required: true },
    end_date: { type: String, required: true },
    frequency: { type: String, required: true, enum: ['daily'] }
  },
  payment: {
    payment_id: { type: String, required: true },
    payment_method: { type: String, required: true, enum: ['credit_card', 'paypal', 'bank_transfer'] },
    amount: { type: Number, required: true },
    payment_status: { type: String, required: true, enum: ['paid', 'pending'], default: 'pending' },
    paid_at: { type: Date, default: null }
  },
  booking_status: { type: String, required: true, enum: ['success', 'pending', 'cancelled'], default: 'pending' },
  booking_date: { type: Date, required: true }
});

module.exports = mongoose.model('Booking', bookingSchema);
