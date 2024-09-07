import { Request, Response } from 'express';
import tripManagerService from '../services/tripManager';
import { Trip } from '../models/tripModel';

class TripManagerController {
  async saveTrip(req: Request, res: Response) {
    const { origin, destination, duration, cost, type, display_name } = req.body;

    if (!origin || !destination || !duration || !cost || !type || !display_name) {
      const msg: string = 'Missing required parameter trip ==> origin, destination, duration, cost, type, display_name is required';
      return res.status(400).json({ message: msg });
    }

    try {
      const tripAlreadyExists: Trip[] | null = await tripManagerService.getTripByOriginAndDestination(origin, destination);

      if (tripAlreadyExists && tripAlreadyExists.length > 0) {
        return res.status(409).json({ message: 'Trip already exists' }); // 409 Conflict for existing trip
      }

      const savedTrip = await tripManagerService.saveNewTrip(origin, destination, duration, cost, type, display_name);
      return res.status(201).json({
        message: 'New trip saved',
        data: savedTrip,
      });
    } catch (error) {
      console.error('Error saving trip:', error);
      return res.status(500).json({
        message: `Unable to save a new trip`,
      });
    }
  }

  async getAllSavedTrips(req: Request, res: Response) {
    try {
      const savedTrips: Trip[] | null = await tripManagerService.getAllSavedTrips();

      if (!savedTrips || savedTrips.length === 0) {
        return res.status(200).json({
          message: 'No trips saved',
          data: [],
        });
      }

      return res.status(200).json({
        message: 'Retrieving saved trips',
        data: savedTrips,
      });
    } catch (error) {
      console.error('Error retrieving trips:', error);
      return res.status(500).json({
        message: `Unable to retrieve saved trips`,
      });
    }
  }

  async softDeleteSavedTrip(req: Request, res: Response) {
    const { id } = req.params;

    if (!id) {
      const msg = 'Missing id field parameter';
      return res.status(400).json({ message: msg });
    }

    try {
      await tripManagerService.softDeleteSavedTrip(id);
      return res.status(200).json({
        message: 'Saved Trip Deleted',
      });
    } catch (error) {
      console.error('Error deleting trip:', error);
      return res.status(500).json({
        message: 'Error deleting trip',
      });
    }
  }

  async restoreDeletedTrip(req: Request, res: Response) {
    const { id } = req.params;

    if (!id) {
      const msg = 'Missing id field parameter';
      return res.status(400).json({ message: msg });
    }

    try {
      await tripManagerService.restoreDeletedTrip(id);
      return res.status(200).json({
        message: 'Deleted trip restored',
      });
    } catch (error) {
      console.error('Error restoring trip:', error);
      return res.status(500).json({
        message: 'Error restoring trip',
      });
    }
  }
}

const tripManagerController = new TripManagerController();
export default tripManagerController;
