import { TripModel } from '../models/tripModel';

class TripManagerRepository {
  async saveNewTrip(
    origin: string,
    destination: string,
    duration: number,
    cost: number,
    type: string,
    display_name: string
  ) {
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
      throw error;
    }
  }

  async getAllSavedTrips() {
    try {
      return await TripModel.find({ isDeleted: false });
    } catch (error) {
      throw error;
    }
  }

  async softDeleteSavedTrip(id: string) {
    try {
      await TripModel.findByIdAndUpdate(id, { isDeleted: true });
    } catch (error) {
      throw error;
    }
  }
}

const tripManagerRepository: TripManagerRepository =
  new TripManagerRepository();
export default tripManagerRepository;
