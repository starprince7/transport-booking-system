/**
 * @desc UPDATE Bus.
 * @route /api/buses/:busId
 * @method PUT
 * @access public
 */
import { NextFunction, Request, Response } from 'express';
import ErrorConstructor from '../../utilities/constructError';
import Bus from '../../model/bus';

const UpdateBusDetails = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { busId } = req.params;

  try {
    const updatedBusDetail = await Bus.findByIdAndUpdate(busId, req.body);
    if (!updatedBusDetail) {
      return next(new ErrorConstructor('Bus was not found', 404));
    }
    res.status(200).send({
      error: false,
      message: 'Bus details updated successfully',
      bus: updatedBusDetail,
    });
  } catch (e: any) {
    next(new ErrorConstructor(e.message));
  }
};

export default UpdateBusDetails;
