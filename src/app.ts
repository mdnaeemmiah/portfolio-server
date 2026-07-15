/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import globalErrorHandler from './middlewares/globalErrorHandler';
import router from './route';
import notFound from './middlewares/notFound';



const app: Application = express();

//parsers
app.use(express.json());
app.use(cookieParser());

const allowedOrigins = [
  'https://portfolio-one-ochre-74.vercel.app',
  'http://localhost:3000',
  'http://127.0.0.1:3000',
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
  })
);

// application routes
app.use('/api', router);

app.get('/', (req: Request, res: Response) => {
  res.send('Hi Next Level Developer !');
});

app.use(globalErrorHandler);

//Not Found
app.use(notFound);

export default app;
