import express from 'express';
import { TripPlannerController } from '../controllers/tripPlanner';
import { TripPlannerService } from '../services/tripPlanner';
import { TripManagerController } from '../controllers/tripManager';
import { TripManagerService } from '../services/tripManager';
import { TripRepo } from '../repositories/tripRepo';

const tripRepo = new TripRepo();
const tripManagerService = new TripManagerService(tripRepo);
const tripManagerController = new TripManagerController(tripManagerService);

const tripPlannerService = new TripPlannerService();
const tripPlannerController = new TripPlannerController(tripPlannerService);
const router = express.Router();

// **************************** TRIP PLANNER ROUTES ********************************

/**
 * @swagger
 * /trips:
 *   get:
 *     summary: Get all trips
 *     description: Retrieve a list of all trips with optional sorting and filtering by transport type.
 *     parameters:
 *       - in: query
 *         name: origin
 *         schema:
 *           type: string
 *         required: true
 *         description: The origin location for the trip.
 *       - in: query
 *         name: destination
 *         schema:
 *           type: string
 *         required: true
 *         description: The destination location for the trip.
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           enum: [fastest, cheapest]
 *         required: false
 *         description: Sort trips by fastest or cheapest.
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *         required: false
 *         description: Filter trips by transport type.
 *     responses:
 *       200:
 *         description: A list of trips.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Trip'
 */
router.get('/trips', (req, res) => tripPlannerController.getTrips(req, res));

// **************************** TRIP MANAGER ROUTES ********************************

/**
 * @swagger
 * /trip:
 *   post:
 *     summary: Save a new trip
 *     description: Save a new trip to the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Trip'
 *     responses:
 *       201:
 *         description: Trip created successfully.
 */
router.post('/trip', (req, res) => tripManagerController.saveTrip(req, res));

/**
 * @swagger
 * /trips/saved:
 *   get:
 *     summary: Get all saved trips
 *     description: Retrieve a list of all saved trips.
 *     responses:
 *       200:
 *         description: A list of saved trips.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Trip'
 */
router.get('/trips/saved', (req, res) => tripManagerController.getAllSavedTrips(req, res)); // Get all saved trips

/**
 * @swagger
 * /trips/delete/{id}:
 *   delete:
 *     summary: Soft delete a saved trip
 *     description: Soft delete a trip by marking it as deleted.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The trip ID.
 *     responses:
 *       200:
 *         description: Trip soft-deleted successfully.
 */
router.delete('/trips/delete/:id', (req, res) => tripManagerController.softDeleteSavedTrip(req, res));

/**
 * @swagger
 * /trips/saved/{id}/restore:
 *   patch:
 *     summary: Restore a soft-deleted trip
 *     description: Restore a soft-deleted trip by marking it as active.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The trip ID.
 *     responses:
 *       200:
 *         description: Trip restored successfully.
 */
router.patch('/trips/saved/:id/restore', (req, res) => tripManagerController.restoreDeletedTrip(req, res));

export default router;
