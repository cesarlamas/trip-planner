import { ITripManagerService } from './ItripManager';
import { Trip } from '../models/tripModel';
import { ITripRepo } from '../repositories/ItripRepo';

export class TripManagerService implements ITripManagerService {
  private tripRepository: ITripRepo;

  constructor(tripRepository: ITripRepo) {
    this.tripRepository = tripRepository;
  }

  async saveNewTrip(trip: Partial<Trip>): Promise<Trip> {
    return await this.tripRepository.saveNewTrip(trip);
  }

  async getAllSavedTrips(): Promise<Trip[]> {
    return await this.tripRepository.getAllSavedTrips();
  }

  async getTripByOriginAndDestination(origin: string, destination: string): Promise<Trip[] | null> {
    return await this.tripRepository.getTripByOriginAndDestination(origin, destination);
  }

  async softDeleteSavedTrip(id: string): Promise<Trip | null> {
    return await this.tripRepository.softDeleteSavedTrip(id);
  }

  async restoreDeletedTrip(id: string): Promise<Trip | null> {
    return await this.tripRepository.restoreDeletedTrip(id);
  }
}
