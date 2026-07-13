## Project Summary: Sleep Routine Service
Tech Stack
- Frontend: React 18 + Vite 5 + React Router 6 + Axios
- Backend: Express 4 + Mongoose 7 + JWT + bcryptjs
- Database: MongoDB Atlas (chrome-sleep-db)
- Styling: Custom CSS (no Tailwind/framework), Google Fonts (Playfair Display + Inter)
- No TypeScript, no testing libraries, no state management library (just React Context for auth)
Project Structure
vibe-code-my-ecommerce/
├── apps/
│   ├── api/                          # Express backend (port 3001)
│   │   ├── server.js                 # Entry point, connects DB then mounts routes
│   │   ├── seed.js                   # Seeds all 6 collections
│   │   ├── .env                      # MongoDB URI, PORT, JWT_SECRET
│   │   ├── middleware/auth.js        # JWT auth + authorize (authorize unused)
│   │   ├── models/                   # User, Plan, Host, Booking, Session, Review
│   │   └── routes/                   # auth, users, plans, hosts, bookings, sessions, reviews (CRUD)
│   └── web/                          # React frontend (port 5173, proxies /api → 3001)
│       └── src/
│           ├── App.jsx               # All routes with role-based wrappers
│           ├── index.css             # ~1000 lines, dreamcore design system
│           ├── contexts/AuthContext.jsx
│           ├── services/api.js       # Axios with Bearer token interceptor
│           ├── mock/mockData.js      # All mock data + helper functions
│           ├── components/           # 14 reusable components
│           └── pages/                # 20 pages across public/user/host/admin
Database Schema (6 Collections)
Collection	Key Fields
user	name, email, password, role (user/admin), bedtime, waketime
plans	plan_name (monthly/weekly/daily), duration (30/7/1 days), price (1999/599/99)
host	name, email, password (plaintext!), gender (เคะ/เมะ), personality, rating, host_status (active/busy)
booking	user_id, plan_id, host_id, schedule {start_date, end_date, frequency}, payment {payment_id, method, amount, status, paid_at}, booking_status
session	booking_id, session_date, bedtime_status, wake_status, confirmation_status, sleep_duration
review	booking_id, rating (1-5), comment (Thai)
Relationships: user→booking (1:many), plan→booking (1:many), host→booking (1:many), booking→session (1:many), booking→review (1:many)
Features Completed
Backend (all working)
- Full CRUD routes for all 6 collections
- Auth: login (dual user/host), register, /me endpoint
- JWT middleware (7-day expiry), bcrypt for users, plaintext for hosts
- Bookings routes use .populate() for user/plan/host
- Seed script populates all collections with relationships
Frontend (fully redesigned)
- Public: Hero with animated clouds/stars, Featured Hosts, Plans, Promo Banner, Dream Stats, Reviews, CTA
- User Dashboard: Stats, Active Bookings, Recent Sessions, My Bookings, My Sessions, Profile
- Host Dashboard: Stats, Active Bookings, Upcoming Sessions, Plans, Reviews, Profile
- Admin Dashboard: Stats (6 cards), Recent Bookings table, Recent Reviews, plus CRUD pages for Users/Hosts/Plans/Bookings/Sessions/Reviews
- Auth: Login (user/host tabs with demo credentials), Register
- All 30 source files updated with dreamcore design
UI Design Decisions (Dreamcore Theme)
- Colors: Deep Black #0B0B12, Midnight Blue #10172A, Indigo #3F51B5, Lavender #C4B5FD, Soft Sky #BFDFFF, Cloud White #F7F9FC
- Glassmorphism: Cards, sidebar, navbar, tables all use backdrop-filter: blur() + translucent backgrounds
- Animations: float, drift (clouds), twinkle (stars), glowPulse, fadeInUp
- Hero: Full viewport with CSS-generated starfield + 3 drifting cloud elements + gradient text
- Sidebar: Dark translucent, sticky, 270px wide, role-aware links
- Typography: Playfair Display (serif headings) + Inter (body)
- Icons: Unicode symbols (✦, ◎, ☽, ★, ◇, ○) instead of emoji for consistent rendering
- Responsive: 768px (sidebar → horizontal scroll) and 480px breakpoints
Current Progress
- Build passes: npm run build ✓
- All 30 frontend files redesigned
- Backend is complete and functional
- Frontend uses mock data exclusively (no API integration except login/register)
Remaining Tasks
1. Connect frontend to backend API — Replace mock/mockData.js imports with API calls in all pages
2. Add promotional_offer field to Plan model (exists in MongoDB seed but not in Mongoose schema)
3. Fix host password security — Hosts use plaintext comparison; should use bcrypt
4. Add authorize middleware to protected routes (defined but never used)
5. Add admin route protection — Admin routes currently have no auth guards in backend
6. Implement profile edit persistence — Currently local state only
7. Implement admin delete actions — Currently console.log stubs
8. Add input validation — No form validation beyond required attributes
9. Add the missing host_detail_fields section for host email display consistency
Coding Conventions
- JSX files, no TypeScript
- Thai language for all UI text and labels (keep domain terms Thai per AGENTS.md)
- Global CSS in single index.css file (no CSS modules)
- Component files: PascalCase, one component per file
- Route structure: / (public), /dashboard/* (user), /host/* (host), /admin/* (admin)
- Auth stored in localStorage (JWT token + user JSON)
- Vite proxy: /api → http://localhost:3001
- No comments in code unless requested
- No commits unless explicitly asked
▣  Build · Big Pickle · 32.9s
Build·Big PickleOpenCode Zen

# Project Context

## Project
Sleep Coaching Platform

## Stack
- React
- Vite
- Express
- MongoDB

## Collections
- users
- hosts
- plans
- bookings
- sessions
- reviews

## Theme
Dreamcore
Dark Mode
Glassmorphism
Premium Wellness

## Pages
Public
- Home
- Hosts
- Plans

User
- Dashboard
- My Bookings
- Sessions

Host
- Dashboard
- My Plans
- Sessions

Admin
- Dashboard
- Manage Users
- Manage Hosts
- Manage Bookings

## Rules
- Home shows only public data
- Bookings are private
- Sessions are private
- Reviews are public