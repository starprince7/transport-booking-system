/**
 * @desc GET BUS SEATS. Book a seat in a specific bus.
 * @route /api/buses/:busId/seats
 * @method POST
 * @access public
 */

import { NextFunction, Request, Response } from 'express';
import ErrorConstructor from '../../utilities/constructError';
import Seat from '../../model/seat';
import mailBookingTicket from '../../mailers/send-booking-ticket';

export default async function BookASeat(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { busId } = req.params;
  const { seatNumber, passengerName, email, departureDate } = req.body;

  try {
    const seat = await Seat.findOne({ bus: busId, seatNumber });

    if (!seat)
      return next(
        new ErrorConstructor(
          "This seat was not found or doesn't belong to this bus.",
          404,
        ),
      );
    if (seat && seat.isBooked) {
      return next(new ErrorConstructor('This seat is already booked', 409));
    }

    seat.passengerName = passengerName;
    seat.departureDate = departureDate;
    seat.isBooked = true;
    await seat.save();

    // Populate the 'bus' field after the seat is updated
    const bookedSeat = await seat.populate('bus');

    // send ticket to passenger's email.
    if (email) {
      await mailBookingTicket({ to: email, info: bookedSeat });
    }

    res.status(200).send({ error: false, bookedSeat });
  } catch (e: any) {
    next(new ErrorConstructor(e.message));
  }
}
