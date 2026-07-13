# AGENTS.md

## Project overview

Sleep Routine Service — a platform where users hire real human "hosts" to help maintain sleep discipline (bedtime reminders, wake-up calls, progress tracking). Two apps under `apps/`:

- `apps/api/` — backend (empty, to be built)
- `apps/web/` — frontend (empty, to be built)

## Database: `chrome-sleep-db` (MongoDB)

Seed scripts at:
`/Users/newkie/Desktop/jsd13/week-02/first-meet-dbs/03_my-ecommerce-project/chrome-sleep-db/`

| Collection   | Key fields                                                                 |
|-------------|---------------------------------------------------------------------------|
| `user`      | name, email, password, bedtime, waketime                                  |
| `plans`     | plan_name (monthly/weekly/daily), duration, price                         |
| `host`      | name, email, password, gender (เคะ/เมะ), personality, rating, host_status |
| `booking`   | user_id, plan_id, host_id, schedule {start_date, end_date, frequency}, payment {payment_id, payment_method, amount, payment_status, paid_at}, booking_status |
| `session`   | booking_id, session_date, bedtime_status, wake_status, confirmation_status, sleep_duration |
| `review`    | booking_id, rating, comment                                               |

Business requirements: `/Users/newkie/Desktop/jsd13/week-02/first-meet-dbs/03_my-ecommerce-project/01_my-ecommerce-business.md`

## Repo state

- No commits yet. No `package.json`, no lockfiles, no CI, no build configs.
- `apps/api/.env` exists but is empty.
- `apps/.gitignore` exists but is empty.
- Tech stack is not yet chosen — agent may suggest one that fits the use case.

## Conventions

- README is written in Thai. Keep domain-specific terms in Thai where the business docs use them.
