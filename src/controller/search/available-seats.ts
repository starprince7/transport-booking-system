/**
 * @desc GET Available Seats. Search for available seats on a specific bus based on criteria (e.g., departureDate, number of seats).
 * @route /api/buses/:busId/seats/search?origin=***&destination=***&departureDate=***
 * @method GET
 * @access public
 */
import { NextFunction, Request, Response } from 'express';
import Seat from '../../model/seat';
import ErrorConstructor from '../../utilities/constructError';

export default async function searchAvailableSeats(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const busId = req.params.busId;
  const { departureDate } = req.query;

  // Find the seat for the specific bus at specific departureDate
  try {
    const availableSeats = await Seat.find({
      bus: busId,
      departureDate: departureDate,
      isBooked: false, // Only consider seats that are not booked.
    });

    if (!availableSeats) {
      return next(
        new ErrorConstructor(
          'There are no available seats found on this bus',
          404,
        ),
      );
    }

    res.status(200).send({ error: false, availableSeats });
  } catch (error: any) {
    next(new ErrorConstructor(error.message));
  }
}
