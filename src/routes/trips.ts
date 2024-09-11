import express from 'express';
import tripPlannerController from '../controllers/tripPlanner';
import tripManagerController from '../controllers/tripManager';

const router = express.Router();

// **************************** TRIP PLANNER ROUTES ********************************

/**
 * @swagger
 * /trips:
 *   get:
 *     summary: Get all trips
 *     description: Retrieve a list of all trips.
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
router.get('/trips', tripPlannerController.getTrips);

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
router.post('/trip', tripManagerController.saveTrip); // Save a new trip

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
router.get('/trips/saved', tripManagerController.getAllSavedTrips); // Get all saved trips

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
router.delete('/trips/delete/:id', tripManagerController.softDeleteSavedTrip); // Soft delete a saved trip

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
router.patch('/trips/saved/:id/restore', tripManagerController.restoreDeletedTrip); // Restore a soft-deleted trip

export default router;
