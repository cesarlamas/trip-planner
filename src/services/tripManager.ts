import tripManagerRepository from '../repositories/tripRepo';
import { Trip } from '../models/tripModel';

class TripManagerService {
  async saveNewTrip(origin: string, destination: string, duration: number, cost: number, type: string, display_name: string): Promise<Trip> {
    return await tripManagerRepository.saveNewTrip(origin, destination, duration, cost, type, display_name);
  }

  async getAllSavedTrips(): Promise<Trip[]> {
    return await tripManagerRepository.getAllSavedTrips();
  }

  async getTripByOriginAndDestination(origin: string, destination: string): Promise<Trip[] | null> {
    return await tripManagerRepository.getTripByOriginAndDestination(origin, destination);
  }

  async softDeleteSavedTrip(id: string): Promise<Trip | null> {
    return await tripManagerRepository.softDeleteSavedTrip(id);
  }

  async restoreDeletedTrip(id: string): Promise<Trip | null> {
    return await tripManagerRepository.restoreDeletedTrips(id);
  }
}

export default new TripManagerService();
