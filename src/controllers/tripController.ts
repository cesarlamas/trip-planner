import { Request, Response } from "express";
import { getTrips } from '../services/tripService';

export const searchTrips = async(req: Request, res: Response) : Promise<any> => {
  const {origin, destination, sort_by, type} = req.query;

  if (!origin ||!destination) {
    return res.status(400).json({error: 'Origin or destination are required parameter'});
  }

  try {
    const trips = await getTrips(origin as string, destination as string, sort_by as string, type as string );
    return res.status(201).json(trips);
  } catch (e) {
    res.status(500).json({ error: 'Error fetching trips from the third-party API' });
  }
}