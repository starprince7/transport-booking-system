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
import { formatTimeIn12HourFormat } from '../../utilities/format-time';

const SearchAvailableBuses = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const origin = req.query?.origin;
  const destination = req.query?.destination;
  const departureDate = req.query?.departureDate;

  if (!origin || !destination || !departureDate) {
    return next(
      new ErrorConstructor(
        'Please provide the search query parameters: `origin`, `destination`, and `departureDate`',
      ),
    );
  }

  try {
    // Step 1: Find buses based on the search criteria
    const buses = await Bus.find({
      origin,
      destination,
      departureDate,
    });

    if (!buses || buses.length === 0) {
      return next(
        new ErrorConstructor('There are no available buses at this time', 404),
      );
    }

    // Step 2: Get seat bookings for each identified bus on the specified departureDate
    const availableBuses = [];

    for (const bus of buses) {
      const seats = await Seat.find({
        bus: bus._id,
      });

      // Step 3: Calculate available seats that are not booked for each bus
      const bookedSeats = seats.reduce(
        (count, seat) => count + (seat.isBooked ? 1 : 0),
        0,
      );

      const availableSeats = bus.capacity - bookedSeats;

      // Step 4: Check if the bus has available seats
      // If `availableSeats` is above zero, it means there are still some seats left,
      // hence this validates this bus as an Available bus.
      if (availableSeats > 0) {
        // Check if departureDate is a Date object, and then extract the time
        const departureTime = bus.departureDate
          ? formatTimeIn12HourFormat(bus.departureDate)
          : '';

        // Add the bus to the list of available buses along with the departure time
        availableBuses.push({
          bus: bus,
          availableSeats: availableSeats,
          departureTime: departureTime,
        });
      }
    }

    res.status(200).json({ error: false, availableBuses });
  } catch (e: any) {
    next(new ErrorConstructor(e.message));
  }
};

export default SearchAvailableBuses;
