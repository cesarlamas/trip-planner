import { Request, Response } from 'express';

export interface ITripManagerController {
  saveTrip(req: Request, res: Response): Promise<void>;
  getAllSavedTrips(req: Request, res: Response): Promise<void>;
  softDeleteSavedTrip(req: Request, res: Response): Promise<void>;
  restoreDeletedTrip(req: Request, res: Response): Promise<void>;
}
