import { MongoMemoryServer } from 'mongodb-memory-server';
import { connectDB, disconnectDB } from './src/config/db';

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();

  await connectDB(uri);
});

afterAll(async () => {
  await disconnectDB();

  await mongoServer.stop();
});
