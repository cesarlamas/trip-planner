import { Request, Response } from 'express';
import { ITripManagerService } from '../services/interfaces/ItripManager';
import { Trip, TripModel } from '../models/tripModel';
import { createDisplayName } from '../utils/tripUtils';
import { ITripManagerController } from './interfaces/ItripManager';

export class TripManagerController implements ITripManagerController {
  private tripManagerService: ITripManagerService;

  constructor(tripManagerService: ITripManagerService) {
    this.tripManagerService = tripManagerService; // Use `tripManagerService` instead of `tripService`
  }

  async saveTrip(req: Request, res: Response): Promise<void> {
    const { origin, destination, duration, cost, type } = req.body;

    if (!origin || !destination || !duration || !cost || !type) {
      const msg: string = 'Missing required parameter trip ==> origin, destination, duration, cost, type is required';
      res.status(400).json({ message: msg });
      return;
    }

    if (origin.length !== 3 || destination.length !== 3) {
      const msg: string = 'Origin or destination airport not known';
      res.status(400).json({ message: msg });
      return;
    }

    const display_name: string = createDisplayName(origin, destination, type);

    try {
      const tripAlreadyExists: Trip[] | null = await this.tripManagerService.getTripByOriginAndDestination(origin, destination);

      if (tripAlreadyExists && tripAlreadyExists.length > 0) {
        res.status(409).json({ message: 'Trip already exists' });
        return;
      }

      const newTripData: Partial<Trip> = {
        origin,
        destination,
        duration,
        cost,
        type,
        display_name,
      };

      const savedTrip = await this.tripManagerService.saveNewTrip(newTripData);
      res.status(201).json({
        message: 'New trip saved',
        data: savedTrip,
      });
      return;
    } catch (error) {
      console.error('Error saving trip:', error);
      res.status(500).json({
        message: `Unable to save a new trip`,
      });
      return;
    }
  }

  async getAllSavedTrips(req: Request, res: Response): Promise<void> {
    try {
      const savedTrips: Trip[] | null = await this.tripManagerService.getAllSavedTrips();

      if (!savedTrips || savedTrips.length === 0) {
        res.status(200).json({
          message: 'No saved trips',
          data: [],
        });
        return;
      }

      res.status(200).json({
        message: 'Retrieving saved trips',
        data: savedTrips,
      });
      return;
    } catch (error) {
      console.error('Error retrieving trips:', error);
      res.status(500).json({
        message: `Unable to retrieve saved trips`,
      });
      return;
    }
  }

  async softDeleteSavedTrip(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    if (!id) {
      const msg = 'Missing id field parameter';
      res.status(400).json({ message: msg });
      return;
    }

    try {
      await this.tripManagerService.softDeleteSavedTrip(id);
      res.status(200).json({
        message: 'Saved Trip Deleted',
      });
      return;
    } catch (error) {
      res.status(500).json({
        message: 'Error deleting trip',
      });
      return;
    }
  }

  async restoreDeletedTrip(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    if (!id) {
      const msg = 'Missing id field parameter';
      res.status(400).json({ message: msg });
      return;
    }

    try {
      await this.tripManagerService.restoreDeletedTrip(id);
      res.status(200).json({
        message: 'Deleted trip restored',
      });
      return;
    } catch (error) {
      console.error('Error restoring trip:', error);
      res.status(500).json({
        message: 'Error restoring trip',
      });
      return;
    }
  }
}
