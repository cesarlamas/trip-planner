import dotenv from 'dotenv';
import express from 'express';
import tripsRouter from './routes/trips';
import { connectDB } from '../src/models/db';
import router from './routes/trips';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const app = express();

dotenv.config();
connectDB();

// Swagger connection and info
const options = {
  definition: {
    openapi: '3.0.1',
    info: {
      title: 'Trip Planner API',
      version: '1.0.0',
      description:
        'API documentation for the Trip Planner and Trip Manager services.',
    },
    schemes: ['http', 'https'],
    servers: [{ url: 'http://localhost:3000/' }],
  },
  apis: ['./src/routes/*.ts', './src/controllers/*.ts'],
};

const swaggerSpec = swaggerJSDoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(express.json());
app.use('/search', tripsRouter);
app.use(router);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
