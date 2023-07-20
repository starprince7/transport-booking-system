# BUS Booking System API.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:4000](http://localhost:4000) with your browser to see the result.

You can start editing by modifying `/src/server.js`. The page auto-updates as you edit the file.

## API ENDPOINTS

- Bus Endpoints:

  - GET /buses: Get a list of all buses.
  - POST /buses: Create a new bus.
  - GET /buses/:busId: Get details of a specific bus.
  - PUT /buses/:busId: Update details of a specific bus.
  - DELETE /buses/:busId: Delete a specific bus.

- Seat Booking Endpoints:

  - GET /buses/:busId/seats: Get the list of available seats for a specific bus.
  - POST /buses/:busId/seats: Book a seat on a specific bus.
  - GET /buses/:busId/seats/:seatId: Get details of a specific seat.
  - PUT /buses/:busId/seats/:seatId: Update details of a specific seat booking.
  - PUT /buses/:busId/seats/:seatId/cancel: Cancel a specific seat booking.

- Search Endpoints:

  - GET /buses/search: Search for buses based on specific criteria (e.g., origin, destination, date).
  - GET /buses/:busId/seats/search: Search for available seats on a specific bus based on criteria (e.g., date, number of seats).

Due to my lack of the necessary permissions for user privacy, I do not intend to save the information of the testers (users) of this software.
Hence the following endpoints will not exist.

- User Endpoints:
  - POST /users: Create a new user account.
  - GET /users/:userId: Get user profile information.
  - PUT /users/:userId: Update user profile information.
  - DELETE /users/:userId: Delete a user account.
