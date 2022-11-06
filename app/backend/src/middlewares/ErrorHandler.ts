import { ErrorRequestHandler } from 'express';
import CustomError from '../Error/CustomError';

const ErrorHandler: ErrorRequestHandler = (error, req, res) => {
  if (error instanceof CustomError) {
    return res.status(error.statusCode).json({ message: error.message });
  }
  return res.status(500).json({ message: error.message });
};

export default ErrorHandler;
