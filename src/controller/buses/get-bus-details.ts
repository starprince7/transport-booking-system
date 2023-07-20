/**
 * @desc Get Single Bus Detail.
 * @route /api/buses/:busId
 * @method GET
 * @access public
 */
import { NextFunction, Request, Response } from 'express';
import Bus from '../../model/bus';
import ErrorConstructor from '../../utilities/constructError';

const GetBusDetails = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { busId } = req.params;

  if (!busId) {
    return next(
      new ErrorConstructor(
        'Missing busId, Please specify a busId as a route paramater.',
        401,
      ),
    );
  }

  try {
    const bus = await Bus.findById(busId);
    res.status(200).send({ error: false, bus });
  } catch (e: any) {
    next(new ErrorConstructor(e.message));
  }
};

export default GetBusDetails;
