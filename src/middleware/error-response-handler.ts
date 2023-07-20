import { Request, Response, NextFunction } from 'express';
import ErrorConstructor from '../utilities/constructError';

const errorResponseHandler = (
  e: Error | ErrorConstructor,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (e instanceof ErrorConstructor) {
    res.status(e.statusCode).json({
      message: e.message,
      statusCode: e.statusCode,
      error: true,
    });
  } else {
    res.status(500).json({
      message: 'Internal Server Error',
      statusCode: 500,
      error: true,
    });
  }
};

export default errorResponseHandler;
