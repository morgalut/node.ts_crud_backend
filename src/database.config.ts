import mongoose from 'mongoose';
import logger from 'jet-logger';

// Fetch the MongoDB URI safely from environment variables
// eslint-disable-next-line max-len, n/no-process-env
const mongoURI = process.env.MONGO_URI ?? 'mongodb://localhost:27017/mydatabase';

mongoose.connect(mongoURI)
  .then(() => {
    logger.info('Database connection successful');
  })
  .catch((error: unknown) => {
    if (error instanceof Error) {
      logger.err('Database connection error: ' + error.message);
    } else {
      logger.err('Unknown database connection error');
    }
  });

export default mongoose;
