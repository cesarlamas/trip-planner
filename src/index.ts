import dotenv from 'dotenv';
import express from 'express';
import tripsRouter from './routes/trips';
import {connectDB} from '../src/models/db';
import router from './routes/trips';

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
// Use the trips router for /search endpoint
app.use('/search', tripsRouter);
app.use(router);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
