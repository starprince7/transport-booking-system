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

## API Endpoints

- Bus Endpoints:

  - GET /api/buses: Get a list of all buses.
  - POST /api/buses: Create a new bus.
  - GET /api/buses/:busId: Get details of a specific bus.
  - PUT /api/buses/:busId: Update details of a specific bus.
  - DELETE /api/buses/:busId: Delete a specific bus.

- Seat Booking Endpoints:

  - GET /api/buses/:busId/seats: Get the list of available seats for a specific bus.
  - POST /api/buses/:busId/seats: Book a seat on a specific bus.
  - GET /api/buses/:busId/seats/:seatId: Get details of a specific seat.
  - PUT /api/buses/:busId/seats/:seatId: Update details of a specific seat booking.
  - PUT /api/buses/:busId/seats/:seatId/cancel: Cancel a specific seat booking.

- Search Endpoints:

  - GET /api/buses/search: Search for buses based on specific criteria (e.g., origin, destination, date).
  - GET /api/buses/:busId/seats/search: Search for available seats on a specific bus based on criteria (e.g., date, number of seats).

Due to my lack of the necessary permissions for user privacy, I do not intend to save the information of the testers (users) of this software.
Hence the following endpoints will not exist.

- User Endpoints:

  - POST /users: Create a new user account.
  - GET /users/:userId: Get user profile information.
  - PUT /users/:userId: Update user profile information.
  - DELETE /users/:userId: Delete a user account.

#### Consistent Error Response Structure Accross All API Routes.

```json
{
  "message": "...",
  "statusCode": 400,
  "error": true
}
```

## Usage

Basic usage.

#### Add a New Bus

To add a new bus make a `POST` request to `/api/buses/`
Required request body

- Body Parameters
  - registrationNumber: Unique vehicle registration plate No.
  - model: STRING The brand type of bus vehicle e.g: Mercedes.
  - capacity: NUMBER The passenger's email.
  - origin: STRING The start location of a bus.
  - destination: STRING The end location of a bus.
  - departureDate: DATE-STRING Time and day of departure.
  - seatPrice: NUMBER Price amount to pay for a seat.
  - busType: STRING Example bus types; Shuttle Bus, Transit Bus, Electric Bus etc.
  - amenities: ARRAY This is a list of special features in a bus e.g: Power Outlets, Onboard Toilet, Overhead video players.

Example API route: POST `localhost:4000/api/buses`

- Success Response

```json
{
  "error": false,
  "newBus": {
    "seatPrice": 35000,
    "registrationNumber": "ABC125DE",
    "model": "Mercedes",
    "capacity": 5,
    "available": true,
    "busType": "Electric Bus",
    "amenities": ["Wi-Fi", "TV", "Power Outlets", "Air Conditioner"],
    "origin": "Portharcourt",
    "destination": "Abuja",
    "_id": "64b9fed07a8ae34deeec53b4",
    "createdAt": "2023-07-21T03:43:12.218Z",
    "updatedAt": "2023-07-21T03:43:12.218Z",
    "__v": 0
  },
  "message": "Bus created successfully with 5 seats"
}
```

- Error Response

```json
{
  "message": "Duplicate registrationNumber found, this data already exits.",
  "statusCode": 400,
  "error": true
}
```

#### Update an Existing Bus

To update details of an existing bus make a `PUT` request to `/api/buses/:busId`
Required request body

- Body Parameters

  - registrationNumber: Unique vehicle registration plate No.
  - model: STRING The brand type of bus vehicle e.g: Mercedes.
  - capacity: NUMBER The passenger's email.
  - origin: STRING The start location of a bus.
  - destination: STRING The end location of a bus.
  - departureDate: DATE-STRING Time and day of departure.
  - seatPrice: NUMBER Price amount to pay for a seat.
  - busType: STRING Example bus types; Shuttle Bus, Transit Bus, Electric Bus etc.
  - amenities: ARRAY This is a list of special features in a bus e.g: Power Outlets, Onboard Toilet, Overhead video players.

  - available: BOOLEAN This specifies the availablitiy of a bus.

- Success Response

```json
{
  "error": false,
  "message": "Bus details updated successfully",
  "bus": {
    "_id": "64b9fed07a8ae34deeec53b4",
    "seatPrice": 65000,
    "registrationNumber": "ABC125DE",
    "model": "Mercedes",
    "capacity": 5,
    "available": true,
    "busType": "Electric Bus",
    "amenities": ["Wi-Fi", "TV", "Power Outlets", "Air Conditioner"],
    "origin": "Portharcourt",
    "destination": "Abuja",
    "createdAt": "2023-07-21T03:43:12.218Z",
    "updatedAt": "2023-07-21T03:43:12.218Z",
    "__v": 0
  }
}
```

#### List All Buses

To fetch list of all buses created make a `GET` request to `/api/buses`

- Success Response

```json
{
  "count": 2,
  "page": "1",
  "limit": "10",
  "buses": [
    {
      "_id": "64bc1512dc5628939b8ab9ec",
      "seatPrice": 35000,
      "registrationNumber": "ABC123DE",
      "model": "Mercedes",
      "capacity": 5,
      "available": true,
      "busType": "Electric Bus",
      "amenities": ["Wi-Fi", "TV", "Power Outlets", "Air Conditioner"],
      "origin": "Lagos",
      "destination": "Abuja",
      "createdAt": "2023-07-22T17:42:42.298Z",
      "updatedAt": "2023-07-22T17:42:42.298Z",
      "__v": 0
    },
    {
      "_id": "64b9fed07a8ae34deeec53b4",
      "seatPrice": 65000,
      "registrationNumber": "ABC125DE",
      "model": "Mercedes",
      "capacity": 5,
      "available": true,
      "busType": "Electric Bus",
      "amenities": ["Wi-Fi", "TV", "Power Outlets", "Air Conditioner"],
      "origin": "Portharcourt",
      "destination": "Abuja",
      "createdAt": "2023-07-21T03:43:12.218Z",
      "updatedAt": "2023-07-21T03:43:12.218Z",
      "__v": 0
    }
  ],
  "error": false
}
```

#### Get Available Buses for departure

To fetch list of all buses created make a `GET` request to `/api/buses/search`

- Query Parameters
  - origin: STRING The start location of a bus.
  - destination: STRING The end location of a bus.
  - departureDate: DATE STRING Time and day of departure.

Example API route: GET `localhost:4000/api/buses/search?origin=Portharcourt&destination=Abuja&departureDate=2023-07-22T17:42:42.298Z`

- Success Response

```json
{
  "error": false,
  "availableBuses": [
    {
      "bus": {
        "_id": "64b9fed07a8ae34deeec53b4",
        "seatPrice": 65000,
        "registrationNumber": "ABC125DE",
        "model": "Mercedes",
        "capacity": 5,
        "available": true,
        "busType": "Electric Bus",
        "amenities": ["Wi-Fi", "TV", "Power Outlets", "Air Conditioner"],
        "origin": "Portharcourt",
        "destination": "Abuja",
        "createdAt": "2023-07-21T03:43:12.218Z",
        "updatedAt": "2023-07-21T03:43:12.218Z",
        "__v": 0,
        "departureDate": "2023-07-22T17:42:42.298Z"
      },
      "availableSeats": 3,
      "departureTime": "6:42 PM"
    }
  ]
}
```

- Error Response

```json
{
  "message": "There are no available buses at this time",
  "statusCode": 404,
  "error": true
}
```

#### Book a Seat

To book a seat make a `POST` request to `/api/buses/:busId/seats`

- Body Parameters
  - seatNumber: NUMBER specific seat no.
  - passengerName: STRING The passenger's full name.
  - email: STRING The passenger's email.
  - departureDate: This is the departure date of a bus, will be assigned to a booked seat only.

Example API route: POST `localhost:4000/api/buses/64b9fed07a8ae34deeec53b4/seats`

- Success Response

```json
{
  "error": false,
  "bookedSeat": {
    "_id": "64b9fed07a8ae34deeec53b7",
    "bus": {
      "_id": "64b9fed07a8ae34deeec53b4",
      "seatPrice": 65000,
      "registrationNumber": "ABC125DE",
      "model": "Mercedes",
      "capacity": 5,
      "available": true,
      "busType": "Electric Bus",
      "amenities": ["Wi-Fi", "TV", "Power Outlets", "Air Conditioner"],
      "origin": "Portharcourt",
      "destination": "Abuja",
      "createdAt": "2023-07-21T03:43:12.218Z",
      "updatedAt": "2023-07-21T03:43:12.218Z",
      "__v": 0,
      "departureDate": "2023-07-22T17:42:42.298Z"
    },
    "seatNumber": 2,
    "passengerName": "Starprince's kid",
    "bookingDate": "2023-07-23T08:46:04.610Z",
    "price": 35000,
    "isBooked": true,
    "__v": 0,
    "departureDate": "2023-07-22T17:42:42.298Z"
  }
}
```

- Error Response

```json
{
  "message": "Seat No 4. is already booked",
  "statusCode": 409,
  "error": true
}
```
