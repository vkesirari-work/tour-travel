# Pahadi Safar API

Node.js, Express and MongoDB backend for bookings, tour packages and dashboard operations.

## Local setup

1. Copy `.env.example` to `.env`.
2. Set `MONGODB_URI` to a local MongoDB or MongoDB Atlas connection string.
3. Run `npm install`.
4. Run `npm run seed` once for sample records.
5. Run `npm run dev`.

The API runs on `http://localhost:5001` by default.

## Endpoints

- `GET /api/health`
- `GET|POST /api/bookings`
- `GET|PATCH|DELETE /api/bookings/:id`
- `GET|POST /api/packages`
- `PATCH|DELETE /api/packages/:id`
- `GET /api/dashboard`

Deploy this backend separately from the frontend and set `FRONTEND_URL` to the deployed frontend origin.
