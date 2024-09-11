import { Request, Response } from 'express';

export interface ITripPlannerController {
  getTrips(req: Request, res: Response): Promise<void>;
}
