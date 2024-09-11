import { ITripRepo } from './ItripRepo';
import { Trip, TripModel } from '../models/tripModel';

export class TripRepo implements ITripRepo {
  async saveNewTrip(trip: Partial<Trip>): Promise<Trip> {
    return await TripModel.create(trip);
  }

  async getAllSavedTrips(): Promise<Trip[]> {
    return await TripModel.find({ isDeleted: false }).exec();
  }

  async getTripByOriginAndDestination(origin: string, destination: string): Promise<Trip[] | null> {
    return await TripModel.find({ origin, destination, isDeleted: false }).exec();
  }

  async softDeleteSavedTrip(id: string): Promise<Trip | null> {
    return await TripModel.findByIdAndUpdate(id, { isDeleted: true, deletedAt: new Date() }, { new: true });
  }

  async restoreDeletedTrip(id: string): Promise<Trip | null> {
    return await TripModel.findByIdAndUpdate(id, { isDeleted: false, deletedAt: null }, { new: true });
  }
}
