import { Request, Response } from 'express';
import tripPlannerService from '../services/tripPlannerService';
import EndpointResponseService from '../services/endpointResponseService';

const endpointResponseService: EndpointResponseService =
  new EndpointResponseService();

class TripPlannerController {
  async getTrips(req: Request, res: Response) {
    const { origin, destination, sort_by, type } = req.query;

    if (!origin || !destination) {
      const msg: string =
        'Error on Getting trips. origin or destination are undefined';
      return endpointResponseService.sendNOk(res, [], msg);
    }

    try {
      const trips = await tripPlannerService.getTrips(
        origin as string,
        destination as string,
        sort_by as string,
        type as string
      );
      return endpointResponseService.sendOk(res, [], trips);
    } catch (e) {
      const msg: string = 'Error on getting trips => No trips where found';
      return endpointResponseService.sendNOk(res, [], msg);
    }
  }
}

const tripPlannerController: TripPlannerController =
  new TripPlannerController();
export default tripPlannerController;
