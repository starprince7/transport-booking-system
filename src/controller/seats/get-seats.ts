/**
 * @desc GET BUS SEATS. Get the list of available seats for a specific bus.
 * @route /api/buses/:busId/seats
 * @method GET
 * @access public
 */
import { NextFunction, Request, Response } from 'express';
import ErrorConstructor from '../../utilities/constructError';
import Seat from '../../model/seat';

export default async function GetBusSeats(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { busId } = req.params; // Bus

  try {
    const seats = await Seat.find({ bus: busId });
    res.status(200).send({ error: false, seats });
  } catch (e: any) {
    next(new ErrorConstructor(e.message));
  }
}
