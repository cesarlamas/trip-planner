import dotenv from 'dotenv';
import express from 'express';
import tripsRouter from './routes/trips';
import swaggerUi from 'swagger-ui-express';
import { connectDB } from './config/db';
import swaggerSpec from './config/swagger';
const app = express();

dotenv.config();
connectDB(process.env.MONGOURI as string);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(express.json());
app.use(tripsRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;
