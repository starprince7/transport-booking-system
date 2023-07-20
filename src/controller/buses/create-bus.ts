/**
 * @desc CREATE BUS - Create a new bus & also create the corresponding seats.
 * @route /api/buses/
 * @method POST
 * @access public
 */
import { NextFunction, Request, Response } from 'express';
import ErrorConstructor from '../../utilities/constructError';
import Bus from '../../model/bus';
import Seat from '../../model/seat';

export default async function CreateBus(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const {
    registrationNumber,
    model,
    capacity,
    origin,
    destination,
    seatPrice,
  } = req.body;

  // Validate fields
  if (!registrationNumber)
    return next(new ErrorConstructor('Missing registrationNumber field', 401));
  if (!capacity)
    return next(new ErrorConstructor('Missing capacity field', 401));
  if (!destination)
    return next(new ErrorConstructor('Missing destination field', 401));
  if (!model) return next(new ErrorConstructor('Missing model field', 401));
  if (!origin) return next(new ErrorConstructor('Missing origin field', 401));

  try {
    // Create a Bus
    const newBus = await Bus.create(req.body);

    // Create seats based on the bus capacity.
    const seatsToCreate = [];

    for (let seatNumber = 1; seatNumber <= capacity; seatNumber++) {
      // create seat object.
      seatsToCreate.push({
        busId: newBus._id,
        seatNumber,
        passengerName: null,
        bookingDate: null,
        price: seatPrice,
      });
    }
    await Seat.insertMany(seatsToCreate);

    res.status(201).send({
      error: false,
      newBus,
      message: `Bus created successfully with ${capacity} seats`,
    });
  } catch (e: any) {
    next(new ErrorConstructor(e.message));
  }
}
