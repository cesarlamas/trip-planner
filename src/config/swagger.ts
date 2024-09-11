import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.1',
    info: {
      title: 'Trip Planner API',
      version: '1.0.0',
      description: 'API documentation for the Trip Planner and Trip Manager services.',
    },
    schemes: ['http', 'https'],
    servers: [{ url: 'http://localhost:3000/' }],
    components: {
      schemas: {
        Trip: {
          type: 'object',
          required: ['origin', 'destination', 'duration', 'cost', 'type'],
          properties: {
            origin: {
              type: 'string',
              description: '3-letter IATA code of the origin airport',
              example: 'JFK',
            },
            destination: {
              type: 'string',
              description: '3-letter IATA code of the destination airport',
              example: 'LAX',
            },
            duration: {
              type: 'integer',
              description: 'Duration of the trip in minutes',
              example: 360,
            },
            cost: {
              type: 'number',
              description: 'Cost of the trip in USD',
              example: 299.99,
            },
            type: {
              type: 'string',
              description: 'Transport type of the trip',
              example: 'car',
            },
            display_name: {
              type: 'string',
              description: 'A human-readable display name for the trip',
              example: 'Trip from JFK to LAX (business)',
            },
            isDeleted: {
              type: 'boolean',
              description: 'Flag indicating if the trip is deleted',
              default: false,
            },
            deletedAt: {
              type: 'string',
              format: 'date-time',
              description: 'Timestamp when the trip was deleted',
              example: '2023-08-25T14:48:00.000Z',
            },
          },
        },
      },
    },
  },
  apis: ['./src/routes/*.ts', './src/controllers/*.ts'],
};

const swaggerSpec = swaggerJSDoc(options);
export default swaggerSpec;
