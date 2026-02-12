import express  from 'express';
import authRouter from './routes/users.route';
import {swaggerSetup}  from "./config/swagger";


export const createApp = () => {
  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));


  swaggerSetup(app);
  

  app.use('/api/v1/auth', authRouter)


  app.get('/health', (_, res) => {
    res.status(200).json({ message: 'Server is running' });
  });



  return app;
};
