import express from "express";
import { searchTrips } from "../controllers/tripController";
import saveTrip from "../controllers/tripManagerController";

const router = express.Router();

router.get('/', searchTrips);

router.post('/saveTrip', saveTrip);



export default router;