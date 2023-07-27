import express from 'express';
import cors from 'cors';
import 'dotenv/config';

import databaseConnection from './connectdb';
import busesRouter from './router/bus-routes';
import errorResponseHandler from './middleware/error-response-handler';

// Port
const port = process.env.PORT || 4000;

// config app
const app = express();

// middleware
app.use(express.json());
app.use(cors());

// api routes
app.use('/api/buses', busesRouter);

// route
app.get('/', (req, res) => {
  res.send('Booking system service is running with cors!');
});

// Send specific error formats.
app.use(errorResponseHandler);

// Start server
app.listen(port, async () => {
  await databaseConnection();
  console.log(`Server is started on port ${port}`);
});
