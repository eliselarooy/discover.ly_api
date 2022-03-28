import express from 'express';
// ? Router for routes
import router from './views/router.js';
import logger from './middleware/logger.js';
import connectToDb from './lib/connectToDb.js';
import { port } from './config/environment.js';

// ! importing dotenv
import dotenv from 'dotenv';
// ! configure dotenv
dotenv.config();
// ! get my variable in ANY file in this way
// console.log(process.env.SECRET)

const app = express();

async function startServer() {
  await connectToDb();

  console.log('🤖 Successfully connected to mongo!');

  app.use(express.json());

  app.use(logger);

  app.use('/api', router);

  app.listen(port, () => console.log(`🤖 Up and running on port ${port}`));
}

startServer();

// ! export our app (express server), so that we can use it for testing.
export default app;
