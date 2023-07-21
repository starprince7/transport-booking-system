/**
 * @desc GET Available Buses. Search for buses based on specific criteria (e.g., origin, destination, departureDate).
 * @route /api/buses/search?origin=***&destination=***&departureDate=***
 * @method GET
 * @access public
 */
import { NextFunction, Request, Response } from 'express';
import ErrorConstructor from '../../utilities/constructError';
import Bus from '../../model/bus';
import Seat from '../../model/seat';

const SearchAvailableBuses = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { origin, destination, departureDate } = req.query;

  if (!req.query) {
    return next(
      new ErrorConstructor(
        'Provide a search query parameter of `origin`, `destination` or `departureDate`',
      ),
    );
  }

  // Step 1: Find buses based on the search criteria
  try {
    const buses = await Bus.find({
      origin,
      destination,
      departureDate,
    });
    if (!buses) {
      return next(
        new ErrorConstructor('There are no available bus at this time', 404),
      );
    }

    // Step 2: Get seat bookings for each identified bus on the specified departureDate.
    const availableBuses = [];

    for (const bus of buses) {
      const seats = await Seat.find({
        bus: bus._id,
        departureDate,
      });

      // Step 3: Calculate available seats for each bus
      const bookedSeats = seats.reduce(
        (count, seat) => count + (seat.isBooked ? 1 : 0),
        0,
      );
      const availableSeats = bus.capacity - bookedSeats;

      // Step 4: Check if the bus has available seats
      // If `availableSeats` is above zero it means there is still some seat left,
      // hence this validates this bus as an Available bus.
      if (availableSeats > 0) {
        // Add the bus to the list of available buses
        availableBuses.push({
          bus: bus,
          availableSeats: availableSeats,
        });
      }
    }

    res.status(200).send({ error: false, availableBuses });
  } catch (e: any) {
    next(new ErrorConstructor(e.message));
  }
};

export default SearchAvailableBuses;
