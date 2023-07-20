/**
 * @desc DELETE Bus.
 * @route /api/buses/:busId
 * @method DELETE
 * @access public
 */

import { NextFunction, Request, Response } from 'express';
import ErrorConstructor from '../../utilities/constructError';
import Bus from '../../model/bus';

const DeleteBus = async (req: Request, res: Response, next: NextFunction) => {
  const { busId } = req.params;

  try {
    const deletedBus = await Bus.findByIdAndDelete(busId);
    res
      .status(200)
      .send({ error: false, message: 'Bus removed', bus: deletedBus });
  } catch (e: any) {
    next(new ErrorConstructor(e.message));
  }
};

export default DeleteBus;
