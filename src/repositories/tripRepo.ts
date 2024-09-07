import { Types } from 'mongoose';
import { TripModel, Trip } from '../models/tripModel';
export class TripManagerRepository {
  async saveNewTrip(origin: string, destination: string, duration: number, cost: number, type: string, display_name: string): Promise<Trip> {
    try {
      return await TripModel.create({
        origin,
        destination,
        duration,
        cost,
        type,
        display_name,
      });
    } catch (error) {
      throw new Error('Failed to save new trip');
    }
  }

  async getAllSavedTrips(): Promise<Trip[]> {
    try {
      return await TripModel.find({ isDeleted: false });
    } catch (error) {
      throw new Error('Failed to fetch trips');
    }
  }

  async getTripByOriginAndDestination(origin: string, destination: string): Promise<Trip[]> {
    return await TripModel.find({ origin: origin, destination: destination, isDeleted: false });
  }

  async softDeleteSavedTrip(id: string): Promise<Trip | null> {
    try {
      const objectId = new Types.ObjectId(id);
      const result = await TripModel.findByIdAndUpdate(objectId, { isDeleted: true }, { new: true });
      if (!result) {
        throw new Error('Trip not found');
      }
      return result;
    } catch (error) {
      throw new Error('Failed to soft delete trip');
    }
  }

  async restoreDeletedTrips(id: string): Promise<Trip | null> {
    try {
      const objectId = new Types.ObjectId(id);
      const result = await TripModel.findByIdAndUpdate(objectId, { isDeleted: false }, { new: true });
      if (!result) {
        throw new Error('Trip not found');
      }
      return result;
    } catch (error) {
      throw new Error('Failed to restore trip');
    }
  }
}

export default new TripManagerRepository();
