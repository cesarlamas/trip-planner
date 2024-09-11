import { MongoMemoryServer } from 'mongodb-memory-server';
import { connectDB, disconnectDB } from './src/config/db';
let mongoServer: MongoMemoryServer;
import { configDotenv } from 'dotenv';

configDotenv();

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();

  await connectDB(process.env.MONGOURITEST as string);
});

afterAll(async () => {
  await disconnectDB();

  await mongoServer.stop();
});
