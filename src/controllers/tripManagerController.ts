import { Request, Response } from 'express';
import tripManagerService from '../services/tripManagerService';
import { ObjectId } from 'mongoose';
import { Trip } from '../models/tripModel';

class TripManagerController {
  async saveTrip(req: Request, res: Response) {
    const origin: string = req.body.origin;
    const destination: string = req.body.destination;
    const duration: number = req.body.duration;
    const cost: number = req.body.cost;
    const type: string = req.body.type;
    const display_name: string = req.body.display_name;

    if (
      !origin ||
      !destination ||
      !duration ||
      !cost ||
      !type ||
      !display_name
    ) {
      return res.status(400).json({ error: 'Missing trip parameter' });
    }

    try {
      const saveTrip = await tripManagerService.saveNewTrip(
        origin,
        destination,
        duration,
        cost,
        type,
        display_name
      );
      return res.status(201).json(saveTrip);
    } catch (e) {
      return res.status(500).json({ error: 'Error saving trip' });
    }
  }

  async getAllSavedTrips(req: Request, res: Response) {
    try {
      const getSavedTrips = await tripManagerService.getAllSavedTrips();
      return res.status(200).json(getSavedTrips);
    } catch (e) {
      return res.status(500).json({ error: 'Error getting saved trips' });
    }
  }

  async softDeleteSavedTrips(req: Request, res: Response) {
    const id: string = req.body._id;
    try {
      return await tripManagerService.softDeleteSavedTrips(id);
    } catch (error) {
      return res.status(500);
    }
  }
}

const tripManagerController: TripManagerController =
  new TripManagerController();
export default tripManagerController;
