import { Router } from 'express';
import ListAllBuses from '../controller/buses/list-all-buses';
import GetBusDetails from '../controller/buses/get-bus-details';
import CreateBus from '../controller/buses/create-bus';
import UpdateBusDetails from '../controller/buses/update-bus-details';
import DeleteBus from '../controller/buses/detete-bus';
import GetBusSeats from '../controller/seats/get-seats';
import GetSeatDetails from '../controller/seats/get-seat-details';
import BookASeat from '../controller/seats/book-a-seat';
import UpdateSeat from '../controller/seats/update-seat-details';
import CancelSeatBooking from '../controller/seats/cancel-seat-booking';

const router = Router();
/**
 *  Bus Endpoints:

  - GET /buses: Get a list of all buses.
  - POST /buses: Create a new bus.
  - GET /buses/:busId: Get details of a specific bus.
  - PUT /buses/:busId: Update details of a specific bus.
  - DELETE /buses/:busId: Delete a specific bus.
*/
router.get('/', ListAllBuses);
router.get('/:busId', GetBusDetails);
router.post('/', CreateBus);
router.put('/:busId', UpdateBusDetails);
router.delete('/:busId', DeleteBus);

/**
 *  SEAT Booking Endpoints:

  - GET /buses/:busId/seats: Get the list of available seats for a specific bus.
  - POST /buses/:busId/seats: Book a seat on a specific bus.
  - GET /buses/:busId/seats/:seatId: Get details of a specific seat.
  - PUT /buses/:busId/seats/:seatId: Update details of a specific seat booking.
  - PUT /buses/:busId/seats/:seatId/cancel: Cancel a specific seat booking.
*/
router.get('/:busId/seats', GetBusSeats);
router.get('/:busId/seats/:seatId', GetSeatDetails);
router.post('/:busId/seats', BookASeat);
router.put('/:busId/seats/:seatId', UpdateSeat);
router.put('/:busId/seats/:seatId/cancel', CancelSeatBooking);

/**
 * Search Endpoints:

  - GET /buses/search: Search for buses based on specific criteria (e.g., origin, destination, date).
  - GET /buses/:busId/seats/search: Search for available seats on a specific bus based on criteria (e.g., date, number of seats).
*/
router.get('/search');
router.get('/:busId/seats/search');

export default router;
