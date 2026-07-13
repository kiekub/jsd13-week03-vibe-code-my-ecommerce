require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const User = require('./models/User');
const Plan = require('./models/Plan');
const Host = require('./models/Host');
const Booking = require('./models/Booking');
const Session = require('./models/Session');
const Review = require('./models/Review');

const users = [
  { name: 'namtan', email: 'namtan@example.com', password: 'namtan0101', role: 'admin', bedtime: '22:00', waketime: '07:00' },
  { name: 'love', email: 'love@example.com', password: 'love0102', role: 'user', bedtime: '23:00', waketime: '08:00' },
  { name: 'earnearn', email: 'earnearn@example.com', password: 'earnearn0103', role: 'user', bedtime: '21:00', waketime: '06:00' },
  { name: 'emi', email: 'emi@example.com', password: 'emi0104', role: 'user', bedtime: '23:30', waketime: '06:30' },
  { name: 'view', email: 'view@example.com', password: 'view0105', role: 'user', bedtime: '22:30', waketime: '06:00' },
  { name: 'nicky', email: 'nicky@example.com', password: 'nicky0106', role: 'user', bedtime: '00:00', waketime: '07:30' },
  { name: 'dear', email: 'dear@example.com', password: 'dear0107', role: 'user', bedtime: '21:30', waketime: '05:30' },
  { name: 'sita', email: 'sita@example.com', password: 'sita0108', role: 'user', bedtime: '23:30', waketime: '08:30' },
  { name: 'karina', email: 'karina@example.com', password: 'karina0109', role: 'user', bedtime: '22:00', waketime: '06:00' },
  { name: 'ningning', email: 'ningning@example.com', password: 'ningning0110', role: 'user', bedtime: '00:30', waketime: '08:00' },
];

const plans = [
  { plan_name: 'monthly', duration: 30, price: 1999 },
  { plan_name: 'weekly', duration: 7, price: 599 },
  { plan_name: 'daily', duration: 1, price: 99 },
];

const hosts = [
  { name: 'film', email: 'film@example.com', password: '666-0101', gender: 'เคะ', personality: 'Friendly', rating: 5.0, host_status: 'active' },
  { name: 'milk', email: 'milk@example.com', password: '666-0102', gender: 'เมะ', personality: 'Cool', rating: 5.0, host_status: 'busy' },
  { name: 'mint', email: 'mint@example.com', password: '666-0103', gender: 'เคะ', personality: 'Kind', rating: 5.0, host_status: 'active' },
  { name: 'bonnie', email: 'bonnie@example.com', password: '666-0104', gender: 'เมะ', personality: 'Gentle', rating: 4.9, host_status: 'active' },
  { name: 'mim', email: 'mim@example.com', password: '666-0105', gender: 'เคะ', personality: 'Playful', rating: 4.8, host_status: 'busy' },
  { name: 'bear', email: 'bear@example.com', password: '666-0106', gender: 'เมะ', personality: 'Calm', rating: 5.0, host_status: 'active' },
  { name: 'game', email: 'game@example.com', password: '666-0107', gender: 'เมะ', personality: 'Cheerful', rating: 4.9, host_status: 'active' },
  { name: 'grace', email: 'grace@example.com', password: '666-0108', gender: 'เมะ', personality: 'Mysterious', rating: 5.0, host_status: 'busy' },
  { name: 'winter', email: 'winter@example.com', password: '666-0109', gender: 'เคะ', personality: 'Warm', rating: 5.0, host_status: 'active' },
  { name: 'gel', email: 'gel@example.com', password: '666-0110', gender: 'เมะ', personality: 'Elegant', rating: 5.0, host_status: 'active' },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    await User.deleteMany({});
    await Plan.deleteMany({});
    await Host.deleteMany({});
    await Booking.deleteMany({});
    await Session.deleteMany({});
    await Review.deleteMany({});
    console.log('Cleared existing data');

    const hashedUsers = await Promise.all(
      users.map(async (u) => ({
        ...u,
        password: await bcrypt.hash(u.password, 10)
      }))
    );

    const savedUsers = await User.insertMany(hashedUsers);
    const savedPlans = await Plan.insertMany(plans);
    const savedHosts = await Host.insertMany(hosts);
    console.log(`Inserted ${savedUsers.length} users, ${savedPlans.length} plans, ${savedHosts.length} hosts`);

    const bookings = [
      { user_id: savedUsers[0]._id, plan_id: savedPlans[0]._id, host_id: savedHosts[0]._id, schedule: { start_date: '2026-03-01', end_date: '2026-03-30', frequency: 'daily' }, payment: { payment_id: 'PAY001', payment_method: 'credit_card', amount: 1999, payment_status: 'paid', paid_at: new Date('2026-02-25T10:00:00Z') }, booking_status: 'success', booking_date: new Date('2026-02-25T11:00:00Z') },
      { user_id: savedUsers[1]._id, plan_id: savedPlans[1]._id, host_id: savedHosts[1]._id, schedule: { start_date: '2026-03-01', end_date: '2026-03-07', frequency: 'daily' }, payment: { payment_id: 'PAY002', payment_method: 'paypal', amount: 599, payment_status: 'paid', paid_at: new Date('2026-02-25T15:00:00Z') }, booking_status: 'success', booking_date: new Date('2026-02-26T19:00:00Z') },
      { user_id: savedUsers[2]._id, plan_id: savedPlans[2]._id, host_id: savedHosts[2]._id, schedule: { start_date: '2026-03-02', end_date: '2026-03-03', frequency: 'daily' }, payment: { payment_id: 'PAY003', payment_method: 'bank_transfer', amount: 99, payment_status: 'paid', paid_at: new Date('2026-03-01T16:00:00Z') }, booking_status: 'success', booking_date: new Date('2026-03-01T17:00:00Z') },
      { user_id: savedUsers[3]._id, plan_id: savedPlans[0]._id, host_id: savedHosts[3]._id, schedule: { start_date: '2026-04-01', end_date: '2026-04-30', frequency: 'daily' }, payment: { payment_id: 'PAY004', payment_method: 'credit_card', amount: 1999, payment_status: 'paid', paid_at: new Date('2026-03-28T09:00:00Z') }, booking_status: 'success', booking_date: new Date('2026-03-28T10:00:00Z') },
      { user_id: savedUsers[4]._id, plan_id: savedPlans[1]._id, host_id: savedHosts[4]._id, schedule: { start_date: '2026-04-01', end_date: '2026-04-07', frequency: 'daily' }, payment: { payment_id: 'PAY005', payment_method: 'paypal', amount: 599, payment_status: 'paid', paid_at: new Date('2026-03-29T14:00:00Z') }, booking_status: 'success', booking_date: new Date('2026-03-29T15:00:00Z') },
      { user_id: savedUsers[5]._id, plan_id: savedPlans[2]._id, host_id: savedHosts[5]._id, schedule: { start_date: '2026-04-01', end_date: '2026-04-01', frequency: 'daily' }, payment: { payment_id: 'PAY006', payment_method: 'credit_card', amount: 99, payment_status: 'paid', paid_at: new Date('2026-03-30T08:00:00Z') }, booking_status: 'success', booking_date: new Date('2026-03-30T09:00:00Z') },
      { user_id: savedUsers[6]._id, plan_id: savedPlans[0]._id, host_id: savedHosts[6]._id, schedule: { start_date: '2026-04-01', end_date: '2026-04-30', frequency: 'daily' }, payment: { payment_id: 'PAY007', payment_method: 'bank_transfer', amount: 1999, payment_status: 'paid', paid_at: new Date('2026-03-30T11:00:00Z') }, booking_status: 'success', booking_date: new Date('2026-03-30T12:00:00Z') },
      { user_id: savedUsers[7]._id, plan_id: savedPlans[1]._id, host_id: savedHosts[7]._id, schedule: { start_date: '2026-04-01', end_date: '2026-04-07', frequency: 'daily' }, payment: { payment_id: 'PAY008', payment_method: 'credit_card', amount: 599, payment_status: 'pending', paid_at: null }, booking_status: 'pending', booking_date: new Date('2026-04-01T08:00:00Z') },
      { user_id: savedUsers[8]._id, plan_id: savedPlans[2]._id, host_id: savedHosts[8]._id, schedule: { start_date: '2026-04-02', end_date: '2026-04-02', frequency: 'daily' }, payment: { payment_id: 'PAY009', payment_method: 'paypal', amount: 99, payment_status: 'paid', paid_at: new Date('2026-04-01T10:00:00Z') }, booking_status: 'success', booking_date: new Date('2026-04-01T11:00:00Z') },
      { user_id: savedUsers[9]._id, plan_id: savedPlans[0]._id, host_id: savedHosts[9]._id, schedule: { start_date: '2026-04-01', end_date: '2026-04-30', frequency: 'daily' }, payment: { payment_id: 'PAY010', payment_method: 'credit_card', amount: 1999, payment_status: 'paid', paid_at: new Date('2026-04-01T15:00:00Z') }, booking_status: 'success', booking_date: new Date('2026-04-01T16:00:00Z') },
    ];

    const savedBookings = await Booking.insertMany(bookings);
    console.log(`Inserted ${savedBookings.length} bookings`);

    const sessions = [
      { booking_id: savedBookings[0]._id, session_date: new Date('2026-03-02T23:00:00Z'), bedtime_status: 'completed', wake_status: 'completed', confirmation_status: 'confirmed', sleep_duration: 9 },
      { booking_id: savedBookings[1]._id, session_date: new Date('2026-03-02T23:00:00Z'), bedtime_status: 'completed', wake_status: 'completed', confirmation_status: 'confirmed', sleep_duration: 9 },
      { booking_id: savedBookings[2]._id, session_date: new Date('2026-03-03T21:00:00Z'), bedtime_status: 'completed', wake_status: 'completed', confirmation_status: 'confirmed', sleep_duration: 9 },
      { booking_id: savedBookings[3]._id, session_date: new Date('2026-04-01T23:30:00Z'), bedtime_status: 'completed', wake_status: 'completed', confirmation_status: 'confirmed', sleep_duration: 7 },
      { booking_id: savedBookings[4]._id, session_date: new Date('2026-04-01T22:30:00Z'), bedtime_status: 'completed', wake_status: 'missed', confirmation_status: 'pending', sleep_duration: null },
      { booking_id: savedBookings[5]._id, session_date: new Date('2026-04-01T00:00:00Z'), bedtime_status: 'missed', wake_status: 'completed', confirmation_status: 'pending', sleep_duration: 7 },
      { booking_id: savedBookings[6]._id, session_date: new Date('2026-04-01T21:30:00Z'), bedtime_status: 'completed', wake_status: 'completed', confirmation_status: 'confirmed', sleep_duration: 8 },
      { booking_id: savedBookings[7]._id, session_date: new Date('2026-04-01T23:30:00Z'), bedtime_status: 'completed', wake_status: 'completed', confirmation_status: 'pending', sleep_duration: 9 },
      { booking_id: savedBookings[8]._id, session_date: new Date('2026-04-02T22:00:00Z'), bedtime_status: 'completed', wake_status: 'completed', confirmation_status: 'confirmed', sleep_duration: 8 },
      { booking_id: savedBookings[9]._id, session_date: new Date('2026-04-01T00:30:00Z'), bedtime_status: 'missed', wake_status: 'missed', confirmation_status: 'cancelled', sleep_duration: null },
    ];

    const savedSessions = await Session.insertMany(sessions);
    console.log(`Inserted ${savedSessions.length} sessions`);

    const reviews = [
      { booking_id: savedBookings[0]._id, rating: 5, comment: 'โปรแกรมช่วยให้ปรับเวลานอนได้ดีขึ้น' },
      { booking_id: savedBookings[1]._id, rating: 5, comment: 'โฮสต์บริการดี' },
      { booking_id: savedBookings[2]._id, rating: 5, comment: 'รักโฮสต์' },
      { booking_id: savedBookings[3]._id, rating: 5, comment: 'นอนหลับสบายมาก ขอบคุณโฮสต์' },
      { booking_id: savedBookings[4]._id, rating: 4, comment: 'ดีแต่ตื่นสายไปหน่อย' },
      { booking_id: savedBookings[5]._id, rating: 3, comment: 'โฮสต์น่ารัก แต่ระบบแจ้งเตือนช้า' },
      { booking_id: savedBookings[6]._id, rating: 5, comment: 'ปรับเวลานอนได้ดีขึ้นมาก แนะนำเลย' },
      { booking_id: savedBookings[7]._id, rating: 4, comment: 'โฮสต์บริการดี แต่ยังไม่ได้เริ่มจริงจัง' },
      { booking_id: savedBookings[8]._id, rating: 5, comment: 'ชอบมาก จะต่ออีกเดือน' },
      { booking_id: savedBookings[9]._id, rating: 4, comment: 'คุ้มค่า นอนหลับง่ายขึ้น' },
    ];

    const savedReviews = await Review.insertMany(reviews);
    console.log(`Inserted ${savedReviews.length} reviews`);

    console.log('Seed completed!');
    process.exit(0);
  } catch (err) {
    console.error('Seed error:', err);
    process.exit(1);
  }
}

seed();
