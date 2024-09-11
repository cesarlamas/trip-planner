import { Trip } from '../models/tripModel';

export interface ITripManagerService {
  saveNewTrip(trip: Partial<Trip>): Promise<Trip>;
  getAllSavedTrips(): Promise<Trip[]>;
  getTripByOriginAndDestination(origin: string, destination: string): Promise<Trip[] | null>;
  softDeleteSavedTrip(id: string): Promise<Trip | null>;
  restoreDeletedTrip(id: string): Promise<Trip | null>;
}
