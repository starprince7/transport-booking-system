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
          `Sorry, seat ${seatNumber} is not available on this bus; kindly pick another seat.`,
          404,
        ),
      );
    if (seat && seat.isBooked) {
      return next(
        new ErrorConstructor(`Seat No ${seatNumber}. is already booked`, 409),
      );
    }

    seat.passengerName = passengerName;
    seat.departureDate = departureDate;
    seat.bookingDate = new Date();
    seat.isBooked = true;
    await seat.save();

    // Populate the 'bus' field after the seat is updated
    const bookedSeat = await seat.populate('bus');

    // send ticket to passenger's email.
    if (email) {
      const { error } = await mailBookingTicket({
        to: email,
        bookingInfo: bookedSeat,
      });
      if (error) console.log('Error sending booking ticket:', error);
    }

    res.status(200).send({ error: false, bookedSeat });
  } catch (e: any) {
    next(new ErrorConstructor(e.message));
  }
}
