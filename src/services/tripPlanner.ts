import axios from 'axios';
import { sortTrips, filterByTransportType } from '../utils/tripUtils';
import dotenv from 'dotenv';
import { ITripPlannerService } from '../services/ItripPlanner';
import { Trip } from '../models/tripModel';

dotenv.config();

const API_URL: string = process.env.API_URL as string;
const API_KEY: string = process.env.API_KEY as string;

export class TripPlannerService implements ITripPlannerService {
  async getTrips(filter: Partial<Trip>, sortBy?: string, type?: string): Promise<Trip[]> {
    try {
      const response = await axios.get(API_URL, {
        headers: {
          'x-api-key': API_KEY,
        },
        params: {
          origin: filter.origin,
          destination: filter.destination,
        },
      });

      let trips = response.data;

      if (sortBy) {
        trips = sortTrips(trips, sortBy);
      }

      if (type) {
        trips = filterByTransportType(trips, type);
      }

      return trips;
    } catch (error) {
      console.error('Error fetching trips from API:', error);
      throw new Error('Error retrieving trips');
    }
  }
}
