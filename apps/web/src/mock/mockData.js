// Mock Data - Based on seed data from chrome-sleep-db
// Source: /Users/newkie/Desktop/jsd13/week-02/first-meet-dbs/03_my-ecommerce-project/chrome-sleep-db/

export const mockUsers = [
  { _id: "65f000000000000000000001", name: "namtan", email: "namtan@example.com", role: "admin", bedtime: "22:00", waketime: "07:00" },
  { _id: "65f000000000000000000002", name: "love", email: "love@example.com", role: "user", bedtime: "23:00", waketime: "08:00" },
  { _id: "65f000000000000000000003", name: "earnearn", email: "earnearn@example.com", role: "user", bedtime: "21:00", waketime: "06:00" },
  { _id: "65f000000000000000000004", name: "emi", email: "emi@example.com", role: "user", bedtime: "23:30", waketime: "06:30" },
  { _id: "65f000000000000000000005", name: "view", email: "view@example.com", role: "user", bedtime: "22:30", waketime: "06:00" },
  { _id: "65f000000000000000000006", name: "nicky", email: "nicky@example.com", role: "user", bedtime: "00:00", waketime: "07:30" },
  { _id: "65f000000000000000000007", name: "dear", email: "dear@example.com", role: "user", bedtime: "21:30", waketime: "05:30" },
  { _id: "65f000000000000000000008", name: "sita", email: "sita@example.com", role: "user", bedtime: "23:30", waketime: "08:30" },
  { _id: "65f000000000000000000009", name: "karina", email: "karina@example.com", role: "user", bedtime: "22:00", waketime: "06:00" },
  { _id: "65f000000000000000000010", name: "ningning", email: "ningning@example.com", role: "user", bedtime: "00:30", waketime: "08:00" },
];

export const mockPlans = [
  { _id: "65f100000000000000000001", plan_name: "monthly", duration: 30, price: 1999 },
  { _id: "65f100000000000000000002", plan_name: "weekly", duration: 7, price: 599 },
  { _id: "65f100000000000000000003", plan_name: "daily", duration: 1, price: 99 },
];

export const mockHosts = [
  { _id: "65f200000000000000000001", name: "film", email: "film@example.com", gender: "เคะ", personality: "Friendly", rating: 5.0, host_status: "active" },
  { _id: "65f200000000000000000002", name: "milk", email: "milk@example.com", gender: "เมะ", personality: "Cool", rating: 5.0, host_status: "busy" },
  { _id: "65f300000000000000000003", name: "mint", email: "mint@example.com", gender: "เคะ", personality: "Kind", rating: 5.0, host_status: "active" },
  { _id: "65f200000000000000000004", name: "bonnie", email: "bonnie@example.com", gender: "เมะ", personality: "Gentle", rating: 4.9, host_status: "active" },
  { _id: "65f200000000000000000005", name: "mim", email: "mim@example.com", gender: "เคะ", personality: "Playful", rating: 4.8, host_status: "busy" },
  { _id: "65f200000000000000000006", name: "bear", email: "bear@example.com", gender: "เมะ", personality: "Calm", rating: 5.0, host_status: "active" },
  { _id: "65f200000000000000000007", name: "game", email: "game@example.com", gender: "เมะ", personality: "Cheerful", rating: 4.9, host_status: "active" },
  { _id: "65f200000000000000000008", name: "grace", email: "grace@example.com", gender: "เมะ", personality: "Mysterious", rating: 5.0, host_status: "busy" },
  { _id: "65f200000000000000000009", name: "winter", email: "winter@example.com", gender: "เคะ", personality: "Warm", rating: 5.0, host_status: "active" },
  { _id: "65f200000000000000000010", name: "gel", email: "gel@example.com", gender: "เมะ", personality: "Elegant", rating: 5.0, host_status: "active" },
];

export const mockBookings = [
  {
    _id: "65f130000000000000000001",
    user_id: { _id: "65f000000000000000000001", name: "namtan" },
    plan_id: { _id: "65f100000000000000000001", plan_name: "monthly", price: 1999 },
    host_id: { _id: "65f200000000000000000001", name: "film" },
    schedule: { start_date: "2026-03-01", end_date: "2026-03-30", frequency: "daily" },
    payment: { payment_id: "PAY001", payment_method: "credit_card", amount: 1999, payment_status: "paid", paid_at: "2026-02-25T10:00:00Z" },
    booking_status: "success",
    booking_date: "2026-02-25T11:00:00Z"
  },
  {
    _id: "65f300000000000000000002",
    user_id: { _id: "65f000000000000000000002", name: "love" },
    plan_id: { _id: "65f100000000000000000002", plan_name: "weekly", price: 599 },
    host_id: { _id: "65f200000000000000000002", name: "milk" },
    schedule: { start_date: "2026-03-01", end_date: "2026-03-07", frequency: "daily" },
    payment: { payment_id: "PAY002", payment_method: "paypal", amount: 599, payment_status: "paid", paid_at: "2026-02-25T15:00:00Z" },
    booking_status: "success",
    booking_date: "2026-02-26T19:00:00Z"
  },
  {
    _id: "65f300000000000000000003",
    user_id: { _id: "65f000000000000000000003", name: "earnearn" },
    plan_id: { _id: "65f100000000000000000003", plan_name: "daily", price: 99 },
    host_id: { _id: "65f300000000000000000003", name: "mint" },
    schedule: { start_date: "2026-03-02", end_date: "2026-03-03", frequency: "daily" },
    payment: { payment_id: "PAY003", payment_method: "bank_transfer", amount: 99, payment_status: "paid", paid_at: "2026-03-01T16:00:00Z" },
    booking_status: "success",
    booking_date: "2026-03-01T17:00:00Z"
  },
  {
    _id: "65f130000000000000000004",
    user_id: { _id: "65f000000000000000000004", name: "emi" },
    plan_id: { _id: "65f100000000000000000001", plan_name: "monthly", price: 1999 },
    host_id: { _id: "65f200000000000000000004", name: "bonnie" },
    schedule: { start_date: "2026-04-01", end_date: "2026-04-30", frequency: "daily" },
    payment: { payment_id: "PAY004", payment_method: "credit_card", amount: 1999, payment_status: "paid", paid_at: "2026-03-28T09:00:00Z" },
    booking_status: "success",
    booking_date: "2026-03-28T10:00:00Z"
  },
  {
    _id: "65f130000000000000000005",
    user_id: { _id: "65f000000000000000000005", name: "view" },
    plan_id: { _id: "65f100000000000000000002", plan_name: "weekly", price: 599 },
    host_id: { _id: "65f200000000000000000005", name: "mim" },
    schedule: { start_date: "2026-04-01", end_date: "2026-04-07", frequency: "daily" },
    payment: { payment_id: "PAY005", payment_method: "paypal", amount: 599, payment_status: "paid", paid_at: "2026-03-29T14:00:00Z" },
    booking_status: "success",
    booking_date: "2026-03-29T15:00:00Z"
  },
  {
    _id: "65f130000000000000000006",
    user_id: { _id: "65f000000000000000000006", name: "nicky" },
    plan_id: { _id: "65f100000000000000000003", plan_name: "daily", price: 99 },
    host_id: { _id: "65f200000000000000000006", name: "bear" },
    schedule: { start_date: "2026-04-01", end_date: "2026-04-01", frequency: "daily" },
    payment: { payment_id: "PAY006", payment_method: "credit_card", amount: 99, payment_status: "paid", paid_at: "2026-03-30T08:00:00Z" },
    booking_status: "success",
    booking_date: "2026-03-30T09:00:00Z"
  },
  {
    _id: "65f130000000000000000007",
    user_id: { _id: "65f000000000000000000007", name: "dear" },
    plan_id: { _id: "65f100000000000000000001", plan_name: "monthly", price: 1999 },
    host_id: { _id: "65f200000000000000000007", name: "game" },
    schedule: { start_date: "2026-04-01", end_date: "2026-04-30", frequency: "daily" },
    payment: { payment_id: "PAY007", payment_method: "bank_transfer", amount: 1999, payment_status: "paid", paid_at: "2026-03-30T11:00:00Z" },
    booking_status: "success",
    booking_date: "2026-03-30T12:00:00Z"
  },
  {
    _id: "65f130000000000000000008",
    user_id: { _id: "65f000000000000000000008", name: "sita" },
    plan_id: { _id: "65f100000000000000000002", plan_name: "weekly", price: 599 },
    host_id: { _id: "65f200000000000000000008", name: "grace" },
    schedule: { start_date: "2026-04-01", end_date: "2026-04-07", frequency: "daily" },
    payment: { payment_id: "PAY008", payment_method: "credit_card", amount: 599, payment_status: "pending", paid_at: null },
    booking_status: "pending",
    booking_date: "2026-04-01T08:00:00Z"
  },
  {
    _id: "65f130000000000000000009",
    user_id: { _id: "65f000000000000000000009", name: "karina" },
    plan_id: { _id: "65f100000000000000000003", plan_name: "daily", price: 99 },
    host_id: { _id: "65f200000000000000000009", name: "winter" },
    schedule: { start_date: "2026-04-02", end_date: "2026-04-02", frequency: "daily" },
    payment: { payment_id: "PAY009", payment_method: "paypal", amount: 99, payment_status: "paid", paid_at: "2026-04-01T10:00:00Z" },
    booking_status: "success",
    booking_date: "2026-04-01T11:00:00Z"
  },
  {
    _id: "65f130000000000000000010",
    user_id: { _id: "65f000000000000000000010", name: "ningning" },
    plan_id: { _id: "65f100000000000000000001", plan_name: "monthly", price: 1999 },
    host_id: { _id: "65f200000000000000000010", name: "gel" },
    schedule: { start_date: "2026-04-01", end_date: "2026-04-30", frequency: "daily" },
    payment: { payment_id: "PAY010", payment_method: "credit_card", amount: 1999, payment_status: "paid", paid_at: "2026-04-01T15:00:00Z" },
    booking_status: "success",
    booking_date: "2026-04-01T16:00:00Z"
  },
];

export const mockSessions = [
  {
    _id: "65f400000000000000000001",
    booking_id: { _id: "65f130000000000000000001", payment: { payment_id: "PAY001" } },
    session_date: "2026-03-02T23:00:00Z",
    bedtime_status: "completed",
    wake_status: "completed",
    confirmation_status: "confirmed",
    sleep_duration: 9
  },
  {
    _id: "65f400000000000000000002",
    booking_id: { _id: "65f300000000000000000002", payment: { payment_id: "PAY002" } },
    session_date: "2026-03-02T23:00:00Z",
    bedtime_status: "completed",
    wake_status: "completed",
    confirmation_status: "confirmed",
    sleep_duration: 9
  },
  {
    _id: "65f100000000000000000003",
    booking_id: { _id: "65f300000000000000000003", payment: { payment_id: "PAY003" } },
    session_date: "2026-03-03T21:00:00Z",
    bedtime_status: "completed",
    wake_status: "completed",
    confirmation_status: "confirmed",
    sleep_duration: 9
  },
  {
    _id: "65f400000000000000000004",
    booking_id: { _id: "65f130000000000000000004", payment: { payment_id: "PAY004" } },
    session_date: "2026-04-01T23:30:00Z",
    bedtime_status: "completed",
    wake_status: "completed",
    confirmation_status: "confirmed",
    sleep_duration: 7
  },
  {
    _id: "65f400000000000000000005",
    booking_id: { _id: "65f130000000000000000005", payment: { payment_id: "PAY005" } },
    session_date: "2026-04-01T22:30:00Z",
    bedtime_status: "completed",
    wake_status: "missed",
    confirmation_status: "pending",
    sleep_duration: null
  },
  {
    _id: "65f400000000000000000006",
    booking_id: { _id: "65f130000000000000000006", payment: { payment_id: "PAY006" } },
    session_date: "2026-04-01T00:00:00Z",
    bedtime_status: "missed",
    wake_status: "completed",
    confirmation_status: "pending",
    sleep_duration: 7
  },
  {
    _id: "65f400000000000000000007",
    booking_id: { _id: "65f130000000000000000007", payment: { payment_id: "PAY007" } },
    session_date: "2026-04-01T21:30:00Z",
    bedtime_status: "completed",
    wake_status: "completed",
    confirmation_status: "confirmed",
    sleep_duration: 8
  },
  {
    _id: "65f400000000000000000008",
    booking_id: { _id: "65f130000000000000000008", payment: { payment_id: "PAY008" } },
    session_date: "2026-04-01T23:30:00Z",
    bedtime_status: "completed",
    wake_status: "completed",
    confirmation_status: "pending",
    sleep_duration: 9
  },
  {
    _id: "65f400000000000000000009",
    booking_id: { _id: "65f130000000000000000009", payment: { payment_id: "PAY009" } },
    session_date: "2026-04-02T22:00:00Z",
    bedtime_status: "completed",
    wake_status: "completed",
    confirmation_status: "confirmed",
    sleep_duration: 8
  },
  {
    _id: "65f400000000000000000010",
    booking_id: { _id: "65f130000000000000000010", payment: { payment_id: "PAY010" } },
    session_date: "2026-04-01T00:30:00Z",
    bedtime_status: "missed",
    wake_status: "missed",
    confirmation_status: "cancelled",
    sleep_duration: null
  },
];

export const mockReviews = [
  {
    _id: "65f500000000000000000001",
    booking_id: { _id: "65f130000000000000000001", payment: { payment_id: "PAY001" } },
    rating: 5,
    comment: "โปรแกรมช่วยให้ปรับเวลานอนได้ดีขึ้น"
  },
  {
    _id: "65f500000000000000000002",
    booking_id: { _id: "65f300000000000000000002", payment: { payment_id: "PAY002" } },
    rating: 5,
    comment: "โฮสต์บริการดี"
  },
  {
    _id: "65f500000000000000000003",
    booking_id: { _id: "65f300000000000000000003", payment: { payment_id: "PAY003" } },
    rating: 5,
    comment: "รักโฮสต์"
  },
  {
    _id: "65f500000000000000000004",
    booking_id: { _id: "65f130000000000000000004", payment: { payment_id: "PAY004" } },
    rating: 5,
    comment: "นอนหลับสบายมาก ขอบคุณโฮสต์"
  },
  {
    _id: "65f500000000000000000005",
    booking_id: { _id: "65f130000000000000000005", payment: { payment_id: "PAY005" } },
    rating: 4,
    comment: "ดีแต่ตื่นสายไปหน่อย"
  },
  {
    _id: "65f500000000000000000006",
    booking_id: { _id: "65f130000000000000000006", payment: { payment_id: "PAY006" } },
    rating: 3,
    comment: "โฮสต์น่ารัก แต่ระบบแจ้งเตือนช้า"
  },
  {
    _id: "65f500000000000000000007",
    booking_id: { _id: "65f130000000000000000007", payment: { payment_id: "PAY007" } },
    rating: 5,
    comment: "ปรับเวลานอนได้ดีขึ้นมาก แนะนำเลย"
  },
  {
    _id: "65f500000000000000000008",
    booking_id: { _id: "65f130000000000000000008", payment: { payment_id: "PAY008" } },
    rating: 4,
    comment: "โฮสต์บริการดี แต่ยังไม่ได้เริ่มจริงจัง"
  },
  {
    _id: "65f500000000000000000009",
    booking_id: { _id: "65f130000000000000000009", payment: { payment_id: "PAY009" } },
    rating: 5,
    comment: "ชอบมาก จะต่ออีกเดือน"
  },
  {
    _id: "65f500000000000000000010",
    booking_id: { _id: "65f130000000000000000010", payment: { payment_id: "PAY010" } },
    rating: 4,
    comment: "คุ้มค่า นอนหลับง่ายขึ้น"
  },
];

// Helper functions for mock data filtering
export const getBookingsByUser = (userId) => mockBookings.filter(b => b.user_id._id === userId);
export const getBookingsByHost = (hostId) => mockBookings.filter(b => b.host_id._id === hostId);
export const getSessionsByBookingIds = (bookingIds) => mockSessions.filter(s => bookingIds.includes(s.booking_id._id));
export const getReviewsByBookingIds = (bookingIds) => mockReviews.filter(r => bookingIds.includes(r.booking_id._id));
export const getActiveHosts = () => mockHosts.filter(h => h.host_status === 'active');
