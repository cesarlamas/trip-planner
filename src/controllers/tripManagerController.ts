import { Request, Response } from 'express';
import tripManagerService from '../services/tripManagerService';
import EndpointResponseService from '../services/endpointResponseService';

class TripManagerController {
  constructor(private endpointResponseService: EndpointResponseService) {}

  async saveTrip(req: Request, res: Response) {
    const { origin, destination, duration, cost, type, display_name } =
      req.body;

    if (
      !origin ||
      !destination ||
      !duration ||
      !cost ||
      !type ||
      !display_name
    ) {
      const msg =
        'Missing required parameter trip ==> origin, destination, duration, cost, type, display_name is required';
      return this.endpointResponseService.sendBadRequest(res, [], msg);
    }

    try {
      const savedTrip = await tripManagerService.saveNewTrip(
        origin,
        destination,
        duration,
        cost,
        type,
        display_name
      );
      return this.endpointResponseService.sendCreated(res, [], savedTrip);
    } catch (error) {
      console.error('Error saving new trip:', error);
      const msg = 'Error saving new trip';
      return this.endpointResponseService.sendNOk(res, [], msg);
    }
  }

  async getAllSavedTrips(req: Request, res: Response) {
    try {
      const savedTrips = await tripManagerService.getAllSavedTrips();
      return this.endpointResponseService.sendOk(res, [], savedTrips);
    } catch (error) {
      console.error('Error getting saved trips:', error);
      const msg = 'Error getting saved trips';
      return this.endpointResponseService.sendNOk(res, [], msg);
    }
  }

  async softDeleteSavedTrip(req: Request, res: Response) {
    const { id } = req.params;

    if (!id) {
      const msg = 'Missing id field parameter';
      return this.endpointResponseService.sendBadRequest(res, [], msg);
    }

    try {
      await tripManagerService.softDeleteSavedTrip(id);
      const msg = 'Saved Trip Deleted';
      return this.endpointResponseService.sendOk(res, [], msg);
    } catch (error) {
      console.error('Error deleting trip:', error);
      const msg = 'Error deleting trip';
      return this.endpointResponseService.sendNOk(res, [], msg);
    }
  }

  async restoreDeletedTrip(req: Request, res: Response) {
    const { id } = req.params;

    if (!id) {
      const msg = 'Missing id field parameter';
      return this.endpointResponseService.sendBadRequest(res, [], msg);
    }

    try {
      await tripManagerService.restoreDeletedTrip(id);
      const msg = 'Deleted trip restored';
      return this.endpointResponseService.sendOk(res, [], msg);
    } catch (error) {
      console.error('Error restoring trip:', error);
      const msg = 'Error restoring trip';
      return this.endpointResponseService.sendNOk(res, [], msg);
    }
  }
}

// Create an instance of EndpointResponseService to inject
const endpointResponseService = new EndpointResponseService();
const tripManagerController = new TripManagerController(
  endpointResponseService
);
export default tripManagerController;
