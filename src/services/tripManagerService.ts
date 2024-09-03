import tripManagerRepository from '../repositories-services/trip-manager.repositor-service';
import { Trip } from '../models/tripModel';

class TripManagerService {
  async saveNewTrip(
    origin: string,
    destination: string,
    duration: number,
    cost: number,
    type: string,
    display_name: string
  ): Promise<Trip> {
    return tripManagerRepository.saveNewTrip(
      origin,
      destination,
      duration,
      cost,
      type,
      display_name
    );
  }

  async getAllSavedTrips(): Promise<Trip[]> {
    return tripManagerRepository.getAllSavedTrips();
  }

  async softDeleteSavedTrip(id: string): Promise<Trip | null> {
    return tripManagerRepository.softDeleteSavedTrip(id);
  }

  async restoreDeletedTrip(id: string): Promise<Trip | null> {
    return tripManagerRepository.restoreDeletedTrips(id);
  }
}

// Directly export the class to allow easy instantiation and testing
export default new TripManagerService();
