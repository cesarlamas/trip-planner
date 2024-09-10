// src/tests/tripController.test.ts
import request from 'supertest';
import app from '../index';
import { TripModel } from '../models/tripModel';

const tripData1 = {
  origin: 'OSL',
  destination: 'ZRH',
  duration: 100,
  cost: 1405,
  type: 'train',
};

const tripData2 = {
  origin: 'FJK',
  destination: 'ZRH',
  duration: 75,
  cost: 870,
  type: 'car',
};

describe('TripManager', () => {
  describe('POST --> /trips', () => {
    it('Should save a new trip and return 201 status', async () => {
      const response = await request(app).post('/trip').send(tripData1);

      expect(response.status).toBe(201);
      expect(response.body.message).toBe('New trip saved');
      expect(response.body.data).toMatchObject(tripData1);
    });

    it('Should fail to save a new Trip if the trip is already created', async () => {
      const response = await request(app).post('/trip').send(tripData1);

      expect(response.status).toBe(409);
      expect(response.body.message).toBe('Trip already exists');
    });

    it('Should fail to save a new trip if origin airport is not recognized(different than 3 chars)', async () => {
      const tripData = {
        origin: 'OSLH',
        destination: 'ZRH',
        duration: 1,
        cost: 1405,
        type: 'train',
      };

      const response = await request(app).post('/trip').send(tripData);

      expect(response.status).toBe(400);
      expect(response.body.message).toBe('Origin or destination airport not known');
    });

    it('Should fail to save a new trip if destination airport is not recognized(different than 3 chars)', async () => {
      const tripData = {
        origin: 'OSL',
        destination: 'ZR',
        duration: 1,
        cost: 1405,
        type: 'train',
      };

      const response = await request(app).post('/trip').send(tripData);

      expect(response.status).toBe(400);
      expect(response.body.message).toBe('Origin or destination airport not known');
    });

    it('should return 400 when origin is missing', async () => {
      const tripData = {
        destination: 'ZRH',
        duration: 1,
        cost: 1405,
        type: 'train',
      };

      const response = await request(app).post('/trip').send(tripData);

      expect(response.status).toBe(400);
      expect(response.body.message).toBe('Missing required parameter trip ==> origin, destination, duration, cost, type is required');
    });

    it('should return 400 when destination is missing', async () => {
      const tripData = {
        origin: 'OSL',
        duration: 1,
        cost: 1405,
        type: 'train',
      };

      const response = await request(app).post('/trip').send(tripData);

      expect(response.status).toBe(400);
      expect(response.body.message).toBe('Missing required parameter trip ==> origin, destination, duration, cost, type is required');
    });

    it('should return 400 when duration is missing', async () => {
      const tripData = {
        origin: 'OSL',
        destination: 'ZRH',
        cost: 1405,
        type: 'train',
      };

      const response = await request(app).post('/trip').send(tripData);

      expect(response.status).toBe(400);
      expect(response.body.message).toBe('Missing required parameter trip ==> origin, destination, duration, cost, type is required');
    });

    it('should return 400 when cost is missing', async () => {
      const tripData = {
        origin: 'OSL',
        destination: 'ZRH',
        duration: 1,
        type: 'train',
      };

      const response = await request(app).post('/trip').send(tripData);

      expect(response.status).toBe(400);
      expect(response.body.message).toBe('Missing required parameter trip ==> origin, destination, duration, cost, type is required');
    });

    it('should return 400 when type is missing', async () => {
      const tripData = {
        origin: 'OSL',
        destination: 'ZRH',
        duration: 1,
        cost: 1405,
      };

      const response = await request(app).post('/trip').send(tripData);

      expect(response.status).toBe(400);
      expect(response.body.message).toBe('Missing required parameter trip ==> origin, destination, duration, cost, type is required');
    });

    it('should return 400 when origin is not a string', async () => {
      const tripData = {
        origin: 123,
        destination: 'ZRH',
        duration: 1,
        cost: 1405,
        type: 'train',
      };

      const response = await request(app).post('/trip').send(tripData);

      expect(response.status).toBe(400);
      expect(response.body.message).toBe('Origin or destination airport not known');
    });

    it('should return 400 when destination is not a string', async () => {
      const tripData = {
        origin: 'OSL',
        destination: 456,
        duration: 1,
        cost: 1405,
        type: 'train',
      };

      const response = await request(app).post('/trip').send(tripData);

      expect(response.status).toBe(400);
      expect(response.body.message).toBe('Origin or destination airport not known');
    });

    afterAll(async () => {
      await TripModel.deleteMany();
    });
  });

  describe('GET --> /trips/savedTrips', () => {
    it('Should return 200 but empty body.data if no trips are saved ', async () => {
      const response = await request(app).get('/trips/saved');

      expect(response.status).toBe(200);
      expect(response.body.data).toStrictEqual([]);
      expect(response.body.message).toBe('No saved trips');
    });

    it('Should return 200 and saved trips', async () => {
      const savedTrip1 = await request(app).post('/trip').send(tripData1);
      const savedTrip2 = await request(app).post('/trip').send(tripData2);

      const response = await request(app).get('/trips/saved');

      expect(response.status).toBe(200);
      expect(response.body.data.length).toBe(2);
      expect(response.body.data[0]).toMatchObject(tripData1);
      expect(response.body.data[1]).toMatchObject(tripData2);

      await TripModel.findByIdAndDelete(savedTrip1.body.data._id);
      await TripModel.findByIdAndDelete(savedTrip2.body.data._id);
    });
  });

  describe('PUT --> /trips/delete/:id && /trips/saved/:id/restore', () => {
    it('should successfully soft delete a trip and return 200 status', async () => {
      const newTrip = await request(app).post('/trip').send(tripData1);
      const savedIdNewTrip = newTrip.body.data._id;

      const response = await request(app).put(`/trips/delete/${savedIdNewTrip.toString()}`);

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Saved Trip Deleted');

      const deletedTrip = await TripModel.findById(savedIdNewTrip);
      expect(deletedTrip?.isDeleted).toBe(true);

      await TripModel.findByIdAndDelete(savedIdNewTrip);
    });

    it('should return 500 when trip with given id does not exist', async () => {
      const nonExistentId = '60d21b4667d0d8992e610c85';
      const response = await request(app).put(`/trips/delete/${nonExistentId}`);

      expect(response.status).toBe(500);
      expect(response.body.message).toBe('Error deleting trip');
    });

    it('Should restore soft deleted trip and return a 200 status', async () => {
      const newTrip = await request(app).post('/trip').send(tripData1);
      const savedIdNewTrip = newTrip.body.data._id;

      await request(app).put(`/trips/saved/${savedIdNewTrip.toString()}`);
      const restoredDeletedTrip = await request(app).put(`/trips/saved/${savedIdNewTrip}/restore`);

      expect(restoredDeletedTrip.status).toBe(200);
      await TripModel.findByIdAndDelete(savedIdNewTrip);
    });
  });
});
