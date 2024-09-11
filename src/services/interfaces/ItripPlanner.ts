import { Trip } from '../../models/tripModel';

export interface ITripPlannerService {
  getTrips(filter: Partial<Trip>, sortBy?: string, type?: string): Promise<Trip[]>;
}
