import { createApp } from './app';
import { connectDB } from './config/database';
import { AppConfig } from './shared/utils';
import dotenv from 'dotenv';

dotenv.config();

const startServer = async (): Promise<void> => {
  try {
    await connectDB();

    const app = createApp();

    app.listen(AppConfig.PORT, () => {
      console.log(`✅ Server is running on port ${AppConfig.PORT}`);
      console.log(`🔧 Environment: ${AppConfig.NODE_ENV}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
