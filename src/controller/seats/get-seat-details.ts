/**
 * @desc GET BUS SEATS. Get details of a specific seat.
 * @route /api/buses/:busId/seats/:seatId
 * @method GET
 * @access public
 */

import { NextFunction, Request, Response } from 'express';
import ErrorConstructor from '../../utilities/constructError';
import Seat from '../../model/seat';

const GetSeatDetails = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { busId, seatId } = req.params;

  try {
    const seatDetail = await Seat.findOne({ bus: busId, _id: seatId });
    if (!seatDetail) {
      return next(
        new ErrorConstructor(
          "This seat was not found or does'nt belong to this bus",
          404,
        ),
      );
    }

    res.status(200).send({ error: false, seat: seatDetail });
  } catch (e: any) {
    next(new ErrorConstructor(e.message));
  }
};

export default GetSeatDetails;
