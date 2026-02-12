import express  from 'express';
import authRouter from './routes/users.route';
import {swaggerSetup}  from "./config/swagger";
import { requestLoggerGlobal } from './middleware/requestLogger';


export const createApp = () => {
  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));


  swaggerSetup(app);

  app.use(requestLoggerGlobal)

  app.use('/api/v1/auth', authRouter)

  // testing----->
  app.get('/health', (_, res) => {
    res.status(200).json({ message: 'Server is running' });
  });



  return app;
};
