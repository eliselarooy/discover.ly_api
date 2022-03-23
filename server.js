import express from 'express';
import { port } from './config/environment.js';
import { connectToDB } from './db/helpers.js';
import router from './config/router.js';
import mongoSanitize from 'express-mongo-sanitize';

const app = express();
app.use(express.json());

app.use(mongoSanitize());

app.use('/api', router);

async function runServer() {
  console.log('Connecting to db');
  await connectToDB();
  console.log('Connected to db');
  app.listen(port, () => console.log(`App listening on port: ${port}`));
}

runServer();
