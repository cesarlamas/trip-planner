import axios from 'axios';
import { sortTrips, filterByTransportType } from '../utils/tripUtils';
import dotenv from 'dotenv';

dotenv.config();

const API_URL: string = process.env.API_URL as string;
const API_KEY: string = process.env.API_KEY as string;

class TripPlannerService {
  async getTrips(origin: string, destination: string, sortBy: string, type: string) {
    const response = await axios.get(API_URL, {
      headers: {
        'x-api-key': API_KEY,
      },
      params: {
        origin,
        destination,
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
  }
}

const tripPlannerService: TripPlannerService = new TripPlannerService();
export default tripPlannerService;
