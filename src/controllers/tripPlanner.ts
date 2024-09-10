import { Request, Response } from 'express';
import tripPlannerService from '../services/tripPlanner';
class TripPlannerController {
  async getTrips(req: Request, res: Response) {
    const { origin, destination, sortBy, type } = req.query;

    if (!origin || !destination) {
      const msg = 'Error: origin and destination are required';
      return res.status(400).json({ message: msg });
    }

    if (origin.length !== 3 || destination.length !== 3) {
      const msg: string = 'Origin or destination airport not known';
      return res.status(400).json({ message: msg });
    }

    try {
      const trips = await tripPlannerService.getTrips(origin as string, destination as string, sortBy as string, type as string);

      if (!trips || trips.length === 0) {
        return res.status(404).json({
          message: 'No trips found',
          data: [],
        });
      }

      return res.status(200).json({
        message: 'Trips retrieved successfully',
        data: trips,
      });
    } catch (error) {
      console.error('Error getting trips:', error);
      return res.status(500).json({
        message: 'Error retrieving trips',
      });
    }
  }
}

const tripPlannerController = new TripPlannerController();
export default tripPlannerController;
