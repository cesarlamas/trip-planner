// src/tests/tripController.test.ts
import request from 'supertest';
import app from '../src/index';
import { TripModel } from '../src/models/tripModel';

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
  describe('GET --> /trip', () => {
    it('should return 200 and the trips if found', async () => {
      const response = await request(app).get('/trips').query({
        origin: 'OSL',
        destination: 'ZRH',
      });

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Trips retrieved successfully');
      expect(response.body.data).not.toBeNull();
    });

    it('should return 200 and sort it by duration', async () => {
      const response = await request(app).get('/trips').query({
        origin: 'OSL',
        destination: 'ZRH',
        sortBy: 'fastest',
      });

      const trips = response.body.data;

      for (let i = 1; i < trips.length; i++) {
        expect(trips[i].duration).toBeGreaterThan(trips[i - 1].duration);
      }
    });

    it('should return 200 and sort it by duration', async () => {
      const response = await request(app).get('/trips').query({
        origin: 'OSL',
        destination: 'ZRH',
        sortBy: 'cheapest',
      });

      const trips = response.body.data;

      for (let i = 1; i < trips.length; i++) {
        expect(trips[i].cost).toBeGreaterThan(trips[i - 1].cost);
      }
    });

    it('should return 200 and the trips by car if found', async () => {
      const response = await request(app).get('/trips').query({
        origin: 'OSL',
        destination: 'ZRH',
        type: 'car',
      });

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Trips retrieved successfully');
      expect(response.body.data).not.toBeNull();
    });

    it('should return 400 if origin or destination are missing', async () => {
      const response = await request(app).get('/trips').query({
        origin: 'OSL',
      });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe('Error: origin and destination are required');
    });

    it('should return 404 if no trips are found', async () => {
      const response = await request(app).get('/trips').query({
        origin: 'ZZZ',
        destination: 'ZRH',
      });

      expect(response.status).toBe(404);
      expect(response.body.message).toBe('No trips found');
    });

    it('should return 400 if origin or destination has more than 3 charachters', async () => {
      const response = await request(app).get('/trips').query({
        origin: 'OSL',
        destination: 'ZRHS',
      });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe('Origin or destination airport not known');
    });
  });

  describe('POST --> /trip', () => {
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

  describe('DELETE --> /trips/delete/:id', () => {
    it('Should successfully soft delete a trip and return 200 status', async () => {
      const newTrip = await request(app).post('/trip').send(tripData1);
      const savedIdNewTrip = newTrip.body.data._id;

      const response = await request(app).delete(`/trips/delete/${savedIdNewTrip.toString()}`);

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Saved Trip Deleted');

      const deletedTrip = await TripModel.findById(savedIdNewTrip);
      expect(deletedTrip?.isDeleted).toBe(true);

      await TripModel.findByIdAndDelete(savedIdNewTrip);
    });

    it('Should return 500 when trip with given id does not exist', async () => {
      const nonExistentId = '60d21b4667d0d8992e610c85f';
      const response = await request(app).delete(`/trips/delete/${nonExistentId}`);

      expect(response.status).toBe(500);
      expect(response.body.message).toBe('Error deleting trip');
    });
  });
  describe('PATCH --> /trips/saved/:id/restore', () => {
    it('Should successfully soft delete a trip and return 200 status', async () => {
      const newTrip = await request(app).post('/trip').send(tripData1);
      const savedIdNewTrip = newTrip.body.data._id;

      await request(app).delete(`/trips/delete/${savedIdNewTrip.toString()}`);
      const response = await request(app).patch(`/trips/saved/${savedIdNewTrip.toString()}/restore`);

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Deleted trip restored');

      const deletedTrip = await TripModel.findById(savedIdNewTrip);
      expect(deletedTrip?.isDeleted).toBe(false);

      await TripModel.findByIdAndDelete(savedIdNewTrip);
    });
    it('Should restore soft deleted trip and return a 200 status', async () => {
      const response = await request(app).patch(`/trips/saved/33453534654/restore`);

      expect(response.status).toBe(500);
      expect(response.body.message).toBe('Error restoring trip');
    });
  });
});
