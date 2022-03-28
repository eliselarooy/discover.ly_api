// ! This code is responsible for connecting to mongodb.

// ? I need mongoose to talk to mongodb.
import mongoose from 'mongoose';
import { dbURI } from '../config/environment.js';

export default function connectToDb() {
  // ? These remove the warnings.
  const options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  };

  return mongoose.connect(dbURI, options);
}
