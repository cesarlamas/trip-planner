import express from 'express';
import tripPlannerController from '../controllers/tripController';
import tripManagerController from '../controllers/tripManagerController';

const router = express.Router();

router.get('/', tripPlannerController.getTrips);

router.post('/saveTrip', tripManagerController.saveTrip);
router.get('/savedTrips', tripManagerController.getAllSavedTrips);

export default router;
