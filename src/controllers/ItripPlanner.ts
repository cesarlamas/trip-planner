import { Trip } from '../models/tripModel';

export interface ITripPlannerController {
  getTrips(filter: Partial<Trip>, sortBy?: string, type?: string): Promise<Trip[]>;
}
