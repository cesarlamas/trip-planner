import tripManagerRepository from '../repositories-services/trip-manager.repositor-service';

class TripManagerService {
  async saveNewTrip(
    origin: string,
    destination: string,
    duration: number,
    cost: number,
    type: string,
    display_name: string
  ) {
    try {
      const newTrip: any = await tripManagerRepository.saveNewTrip(
        origin,
        destination,
        duration,
        cost,
        type,
        display_name
      );
      return newTrip;
    } catch (e) {
      throw e;
    }
  }

  async getAllSavedTrips() {
    try {
      const savedAllTrips: any = await tripManagerRepository.getAllSavedTrips();
      return savedAllTrips;
    } catch (error) {
      throw error;
    }
  }

  async softDeleteSavedTrips(id: string) {
    try {
      return await tripManagerRepository.softDeleteSavedTrip(id);
    } catch (error) {
      throw error;
    }
  }
}

const tripManagerService: TripManagerService = new TripManagerService();
export default tripManagerService;
