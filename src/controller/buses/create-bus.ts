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
  const registrationNumber = req.body?.registrationNumber;
  const model = req.body?.model;
  const capacity = req.body?.capacity;
  const origin = req.body?.origin;
  const destination = req.body?.destination;
  const seatPrice = req.body?.seatPrice;
  const busType = req.body?.busType;

  // Validate fields
  if (!registrationNumber)
    return next(new ErrorConstructor('Missing registrationNumber field', 400));
  if (!capacity)
    return next(new ErrorConstructor('Missing capacity field', 400));
  if (!destination)
    return next(new ErrorConstructor('Missing destination field', 400));
  if (!model) return next(new ErrorConstructor('Missing model field', 400));
  if (!origin) return next(new ErrorConstructor('Missing origin field', 400));
  if (!busType) return next(new ErrorConstructor('Missing busType field', 400));
  if (!seatPrice)
    return next(new ErrorConstructor('Missing seatPrice field', 401));

  try {
    // Create a Bus
    const newBus = await Bus.create(req.body);

    // Create seats based on the bus capacity.
    const seatsToCreate = [];

    for (let seatNumber = 1; seatNumber <= capacity; seatNumber++) {
      // create seat object.
      seatsToCreate.push({
        bus: newBus._id,
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
    if (e.code === 11000) {
      return next(
        new ErrorConstructor(
          'Duplicate registrationNumber found, this data already exits.',
          400,
        ),
      );
    }
    next(new ErrorConstructor(e.message));
  }
}
