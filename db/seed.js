import { connectToDb, disconnectDb } from './helpers.js';
import { usersData, spotsData } from './data.js';
import User from '../models/user.js';
import Spot from '../models/spot.js';

async function seed() {
  try {
    await connectToDb();
    console.log('Database connected');

    await Spot.deleteMany({});
    await User.deleteMany({});

    // Creating users
    const users = await User.create(usersData);
    console.log('Users added to database:', users);

    spotsData.map(
      (spot) =>
        (spot.createdBy = users[Math.floor(Math.random() * users.length)]._id)
    );

    // Creating spots
    const spots = await Spot.create(spotsData);
    console.log('Spots added to database:', spots);

    await disconnectDb();
    console.log('Database disconnected');
  } catch (err) {
    await disconnectDb();
    console.log(err, 'Database disconnected');
  }
}

seed();
