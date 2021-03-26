import 'reflect-metadata';
import createConnection from './database';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import { router } from './routes';
import { AppErrors } from './errors/AppErros';

createConnection();
const app = express();

app.use(express.json());
app.use(router);

app.use(
  (err: Error, request: Request, response: Response, _next: NextFunction) => {
    if (err instanceof AppErrors) {
      return response.status(err.statusCode).json({ message: err.message });
    }
    return response.status(500).json({
      stauts: 'Error',
      message: `Internal server error ${err.message}`,
    });
  }
);

export { app };
