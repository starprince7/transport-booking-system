/**
 * @desc List All Buses
 * @route /api/buses/
 * @method GET
 * @access public
 */
import { NextFunction, Request, Response } from 'express';
import Bus from '../../model/bus';
import ErrorConstructor from '../../utilities/constructError';

export default async function ListAllBuses(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  let { page, limit } = req.query;

  if (!page) page = '1';
  if (!limit) limit = '10';

  try {
    const totalCount = await Bus.aggregate([
      { $group: { _id: null, count: { $sum: 1 } } },
    ]);

    const buses = await Bus.find()
      .sort({ createdAt: -1 })
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit))
      .exec();

    res.status(200).send({
      count: totalCount[0]?.count || 0,
      page,
      limit,
      buses,
      error: false,
    });
  } catch (e: any) {
    next(new ErrorConstructor(e.message));
  }
}
