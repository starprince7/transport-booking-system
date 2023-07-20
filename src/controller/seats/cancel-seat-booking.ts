/**
 * @desc GET BUS SEATS. Book a seat in a specific bus.
 * @route /api/buses/:busId/seats
 * @method POST
 * @access public
 */

import { NextFunction, Request, Response } from 'express';
import ErrorConstructor from '../../utilities/constructError';
import Seat from '../../model/seat';
import sendBookingCancellationMail from '../../mailers/send-cancelled-booking';

export default async function CancelSeatBooking(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { busId } = req.params;
  const { seatNumber, email } = req.body;

  try {
    const seat = await Seat.findOne({ bus: busId, seatNumber });

    if (!seat)
      return next(
        new ErrorConstructor(
          "This seat was not found or doesn't belong to this bus.",
          404,
        ),
      );
    if (seat && !seat.isBooked) {
      return next(new ErrorConstructor('This seat is not booked', 409));
    }

    seat.passengerName = '';
    seat.isBooked = false;
    await seat.save();

    // Populate the 'bus' field after the seat is updated
    const bookedSeat = await seat.populate('bus');

    // send ticket to passenger's email.
    if (email) {
      await sendBookingCancellationMail({ to: email });
    }

    res.status(200).send({ error: false, bookedSeat });
  } catch (e: any) {
    next(new ErrorConstructor(e.message));
  }
}
