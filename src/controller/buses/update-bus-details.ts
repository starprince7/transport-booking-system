/**
 * @desc UPDATE Bus.
 * @route /api/buses/:busId
 * @method PUT
 * @access public
 */
import { NextFunction, Request, Response } from 'express';
import ErrorConstructor from '../../utilities/constructError';
import Bus from '../../model/bus';
import Seat from '../../model/seat';

const UpdateBusDetails = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { busId } = req.params;
  const { capacity } = req.body;

  try {
    const updatedBusDetail = await Bus.findByIdAndUpdate(busId, req.body, {
      new: true,
    });

    if (updatedBusDetail && capacity) {
      const seats = await Seat.find({ bus: busId });
      const lastSeatNumber = seats.length;
      // Create seats based on the bus capacity.
      const seatsToCreate = [];

      // Create new seats.
      for (let seatNumber = 1; seatNumber <= capacity; seatNumber++) {
        // create new seat object.
        seatsToCreate.push({
          bus: busId,
          seatNumber: lastSeatNumber + seatNumber,
          passengerName: null,
          bookingDate: null,
          price: updatedBusDetail.seatPrice,
        });
      }
      await Seat.insertMany(seatsToCreate);
    }
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
