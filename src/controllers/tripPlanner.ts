import { Request, Response } from 'express';
import { Trip } from '../models/tripModel';
import { ITripPlannerService } from '../services/interfaces/ItripPlanner';
import { ITripPlannerController } from './interfaces/ItripPlanner';

export class TripPlannerController implements ITripPlannerController {
  private tripPlannerService: ITripPlannerService;

  constructor(tripPlannerService: ITripPlannerService) {
    this.tripPlannerService = tripPlannerService;
  }

  async getTrips(req: Request, res: Response): Promise<void> {
    const { origin, destination, sortBy, type } = req.query;

    if (!origin || !destination) {
      const msg = 'Error: origin and destination are required';
      res.status(400).json({ message: msg });
      return;
    }

    if (origin.length !== 3 || destination.length !== 3) {
      const msg: string = 'Origin or destination airport not known';
      res.status(400).json({ message: msg });
      return;
    }

    const tripFilter: Partial<Trip> = {
      origin: origin as string,
      destination: destination as string,
    };

    try {
      const trips = await this.tripPlannerService.getTrips(tripFilter, sortBy as string, type as string);

      if (!trips || trips.length === 0) {
        res.status(404).json({ message: 'No trips found', data: [] });
        return;
      }

      res.status(200).json({ message: 'Trips retrieved successfully', data: trips });
    } catch (error) {
      console.error('Error getting trips:', error);
      res.status(500).json({ message: 'Error retrieving trips' });
    }
  }
}
