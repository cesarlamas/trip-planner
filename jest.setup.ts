import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose, { Connection } from 'mongoose';

let mongoServer: MongoMemoryServer;
let mongoConnection: Connection;

// Start the in-memory MongoDB server and create a new connection before running any tests
beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();

  // Use mongoose.createConnection() to create a new connection instance
  mongoConnection = await mongoose.createConnection(mongoUri);
});

// Disconnect Mongoose and stop the in-memory MongoDB server after all tests
afterAll(async () => {
  // Drop the database and close the custom connection
  if (mongoConnection) {
    await mongoConnection.dropDatabase();
    await mongoConnection.close();
  }
  await mongoServer.stop();
});

// Clear all collections after each test to ensure a clean slate
afterEach(async () => {
  if (mongoConnection) {
    const collections = mongoConnection.collections;
    for (const key in collections) {
      const collection = collections[key];
      await collection.deleteMany({});
    }
  }
});
