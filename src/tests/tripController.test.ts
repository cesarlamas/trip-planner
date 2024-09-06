// src/tests/tripController.test.ts
import request from 'supertest';
import app from '../index'; // Import your Express app instance

describe('TripController', () => {
  it('should save a new trip and return 201 status', async () => {
    const tripData = {
      origin: 'OSL',
      destination: 'ZRH',
      duration: 1,
      cost: 1405,
      type: 'train',
      display_name: 'from OSL to ZRH by train',
    };

    const response = await request(app).post('/trips').send(tripData);

    expect(response.statusCode).toBe(201);
    expect(response.body.data).toMatchObject(tripData);
  });

  it('Should fail to save a new Trip if the trip is already created', async () => {
    const tripData = {
      origin: 'OSL',
      destination: 'ZRH',
      duration: 1,
      cost: 1405,
      type: 'train',
      display_name: 'from OSL to ZRH by train',
    };

    const response = await request(app).post('/trips').send(tripData);

    expect(response.statusCode).toBe(403);
    expect(response.body.data).toMatchObject(tripData);
  });

  it('Should fail to save a new trip if a missing parameter is required', async () => {
    const tripData = {
      origin: 'OSL',
      destination: 'ZRH',
      type: 'train',
      display_name: 'from OSL to ZRH by train',
    };

    const response = await request(app).post('/trips').send(tripData);

    expect(response.statusCode).toBe(400);
    expect(response.body.status).toBe('nok');
  });

  it('Should fail to save a new trip if a parameter is not of the correct Type (cost: string)', async () => {
    const tripData = {
      origin: 'OSL',
      destination: 'ZRH',
      duration: 'thirtythree',
      cost: '1405',
      type: 'train',
      display_name: 'from OSL to ZRH by train',
    };

    const response = await request(app).post('/trips').send(tripData);

    expect(response.statusCode).toBe(404);
    expect(response.body.status).toBe('nok');
  });
});
