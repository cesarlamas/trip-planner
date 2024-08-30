import { Request, Response } from "express";
import saveNewTrip from "../services/tripManagerService";

export default async function saveTrip(req: Request, res: Response){
  const origin: string = req.body.origin;
  const destination: string = req.body.destination;
  const duration: number = req.body.duration;
  const cost: number = req.body.cost;
  const type: string = req.body.type;
  const display_name: string = req.body.display_name;

  if (!origin|| !destination || !duration || !cost || !type || !display_name) {
    return res.status(400).json({error: 'Missing trip parameter'});
  }

  try {
    const saveTrip = await saveNewTrip(origin, destination, duration, cost, type, display_name);
    return res.status(201).json(saveTrip);
  } catch (e) {
    res.status(500).json({ error: 'Error saving trip' });
  }
}