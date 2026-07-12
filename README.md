
# Restaurant Reservation Management System

A full-stack restaurant table reservation system with separate customer and
administrator experiences, built as part of a technical assignment.

**Live demo:** https://restaurant-reservation-management-s-chi.vercel.app/
**Backend API:** https://restaurant-reservation-management-system-rrd8.onrender.com/
**API Base URL:** https://restaurant-reservation-management-system-rrd8.onrender.com/api

> Note: the backend is hosted on Render's free tier, so the very first
> request after a period of inactivity can take 30-60 seconds while the
> server spins back up. Subsequent requests are fast.

---

## Tech Stack

**Frontend:** React (Vite), React Router, Axios, react-hot-toast
**Backend:** Node.js, Express
**Database:** MongoDB (Mongoose)
**Auth:** JWT + bcrypt password hashing
**Validation:** express-validator

---

## Project Structure

```
backend/
├── config/db.js               MongoDB connection
├── constants/                 Roles, reservation status, time slot enums
├── controllers/                Route handlers (auth, reservations, admin)
├── middleware/
│   ├── authMiddleware.js       JWT verification (protect)
│   ├── adminMiddleware.js      Role gate (admin-only routes)
│   ├── validators.js           express-validator rule chains
│   └── errorMiddleware.js      Centralized 404 + error handler
├── models/                    User, Table, Reservation (Mongoose schemas)
├── services/reservationService.js   Availability & conflict-checking logic
├── seed/                      Seed scripts for a default admin + tables
├── utils/                     AppError, asyncHandler, generateToken
├── app.js                     Express app setup
└── server.js                  Entry point

frontend/
├── src/
│   ├── components/
│   │   ├── customer/            Booking form, table list, my reservations
│   │   └── admin/                Sidebar, table & reservation management
│   ├── pages/                    Home, Login, Register, dashboards
│   ├── layouts/                  MainLayout (customer), AdminLayout
│   ├── context/AuthContext.jsx   Login state, token storage
│   ├── routes/                   ProtectedRoute (role-based routing)
│   └── services/api.js           Axios instance with auth interceptor
```

---

## Setup Instructions

### Prerequisites
- Node.js (v18+)
- A MongoDB connection string (local MongoDB or a free MongoDB Atlas cluster)

### 1. Backend

```bash
cd backend
npm install
```

Create a `.env` file in `backend/` (see `.env.example`):

```
PORT=5000
MONGO_URI=<your MongoDB connection string>
JWT_SECRET=<any long random string>
```

Seed a default admin account and starting set of tables:

```bash
npm run seed
```

This creates:
- An admin login: `admin@restaurant.com` / `Admin@123`
- 8 tables (T1-T8) with varying seat capacities (2-8 seats)

Start the server:

```bash
npm run dev
```

The API runs on `http://localhost:5000`.

### 2. Frontend

```bash
cd frontend
npm install
```

Create a `.env` file in `frontend/`:

```
VITE_API_URL=http://localhost:5000/api
```

Start the dev server:

```bash
npm run dev
```

The app runs on `http://localhost:5173` by default.

### 3. Try it out
- Register a new account (defaults to the `customer` role).
- Log in as the seeded admin (`admin@restaurant.com` / `Admin@123`) to access the admin dashboard at `/admin`.

---

## Assumptions Made

- A single restaurant is being modeled (not a multi-restaurant/multi-tenant system).
- The restaurant offers a fixed set of daily time slots (defined in `constants/timeSlots.js`), rather than open-ended custom time entry.
- Tables are seeded with fixed capacities rather than being dynamically resized; admins can still add, edit, or deactivate tables at any time.
- A reservation occupies a table for its entire time slot; slots don't partially overlap with one another.
- New user registrations default to the `customer` role. Admin accounts are created via the seed script rather than through public registration, since the assignment doesn't call for a self-service "become an admin" flow.
- "Deleting" a table doesn't delete or orphan its historical reservations — past reservations still display, with a fallback label if their table was later removed.

---

## Reservation & Availability Logic

This is the core evaluation area, so here's exactly how it works:

**When a customer books a specific table** (the normal flow — clicking
"Reserve" on a table shown in the UI):
1. The backend looks up that exact table and confirms it's active.
2. It checks the table's `capacity` against the requested `guests` count — if the table is too small, the booking is rejected with a clear message.
3. It checks for any **existing reservation with `status: "confirmed"`** on that same table, for the same `reservationDate` and `timeSlot`. If one exists, the booking is rejected as a conflict.
4. Only if all checks pass is the reservation created.

**Fallback auto-assignment** (used only if no specific table is provided):
- The service finds all active tables with enough capacity, sorted smallest-first, and walks through them until it finds one with no conflicting confirmed reservation for that date/slot, assigning the first one that's free.

**Cancellation:**
- A reservation's status is set to `cancelled` rather than being deleted, so history is preserved.
- Cancelled reservations are excluded from the conflict check above, meaning a cancelled slot immediately becomes bookable again.

**Admin overrides:**
- Admins can view all reservations, filter by date, and directly change a reservation's status (`confirmed` ↔ `cancelled`) regardless of who created it.

---

## Role-Based Access

Two roles: `customer` and `admin`, stored on the `User` model.

- **Authentication:** JWT issued on login/register, sent as `Authorization: Bearer <token>` on every subsequent request.
- **`protect` middleware:** verifies the JWT and attaches the authenticated user to `req.user`. Applied to every route that requires a logged-in user.
- **`adminOnly` middleware:** checked after `protect`; rejects the request with `403` if `req.user.role !== "admin"`. Applied to every `/api/admin/*` route.
- **Customer-scoped queries:** "my reservations" and "cancel reservation" always filter/verify against `req.user._id` on the backend, so a customer can never view or cancel another customer's reservation — even if they guess a valid reservation ID.
- **Frontend enforcement:** `ProtectedRoute` checks the logged-in user's role before rendering `/dashboard` (customer) or `/admin` (admin), redirecting to the appropriate dashboard or the login page otherwise. This is a UX convenience layer only — the real enforcement happens on the backend, since frontend routing can't be trusted as a security boundary.

---

## Known Limitations

- **Race condition on simultaneous bookings:** the conflict check and the reservation creation are two separate database operations rather than one atomic transaction. In the rare case of two requests for the same table/date/slot arriving at the exact same instant, both could pass the conflict check before either is saved, resulting in a double-booking. A production system would use a MongoDB transaction or a unique compound index on `(table, reservationDate, timeSlot)` scoped to confirmed reservations to close this gap entirely.
- **`Table.status` field is unused:** the `Table` model has an `Available`/`Reserved` status field that isn't currently kept in sync with actual reservations — availability is instead computed dynamically from the `Reservation` collection at request time. The field is harmless but could be removed or wired up for consistency.
- **No pagination:** admin "all reservations" and "all tables" endpoints return the full collection. Fine at assignment scale; would need pagination for a real high-volume restaurant.
- **No email/SMS confirmations:** intentionally out of scope per the assignment notes.
- **Render free-tier cold starts:** the backend spins down after inactivity, so the first request after idle time is noticeably slower.
- **"Available Tables" list isn't date/time-aware:** the table grid shown to customers displays all active tables as available, without filtering by the date and time slot they haven't chosen yet (that's picked inside the reservation modal, after selecting a table). The backend still correctly validates and rejects a conflicting booking on submission, so no double-booking can actually occur — but the customer doesn't see true real-time availability before clicking Reserve. With more time, the date/time picker would move above the table list, and the table grid would refresh to show only tables genuinely free for that slot.

---

## Areas for Improvement with Additional Time

- Enforce the table-conflict check atomically (transaction or unique index) to fully close the race condition above.
- Add a waitlist feature for fully-booked slots.
- Sync `Table.status` in real time so admins can see at a glance which tables are currently occupied, without cross-referencing the reservations list.
- Add pagination and search/filtering to the admin reservations and tables views.
- Add automated tests (unit tests for the reservation conflict logic in particular, since it's the highest-risk area for silent bugs).
- Add rate limiting on auth endpoints to reduce brute-force login risk.
