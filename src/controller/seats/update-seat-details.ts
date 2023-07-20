/**
 * @desc UPDATE SEAT - Update details of a specific seat.
 * @route /api/buses/:busId/seats/:seatId:
 * @method PUT
 * @access public
 */

import { NextFunction, Request, Response } from 'express';
import ErrorConstructor from '../../utilities/constructError';
import Seat from '../../model/seat';

const UpdateSeat = async (req: Request, res: Response, next: NextFunction) => {
  const { busId, seatId } = req.params;
  const {} = req.body;

  try {
    const seatUpdated = await Seat.findOneAndUpdate(
      { bus: busId, _id: seatId },
      req.body,
      { new: true },
    );
    if (!seatUpdated) {
      return next(
        new ErrorConstructor(
          "This seat was not found or doesn't belong to this bus",
          404,
        ),
      );
    }

    res.status(200).send({
      error: false,
      message: 'Seat updated successfully',
      seat: seatUpdated,
    });
  } catch (e: any) {
    next(new ErrorConstructor(e.message));
  }
};

export default UpdateSeat;
