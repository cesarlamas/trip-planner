import express from 'express';
import tripPlannerController from '../controllers/tripController';
import tripManagerController from '../controllers/tripManagerController';

const router = express.Router();

// Trip Planner Routes

/**
 * @swagger
 * /trips:
 *   get:
 *     summary: Get all trips
 *     description: Retrieve a list of all trips.
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

// Trip Manager Routes

/**
 * @swagger
 * /trips:
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
router.post('/trips', tripManagerController.saveTrip); // Save a new trip

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
 * /trips/saved/{id}:
 *   put:
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
router.put('/trips/saved/:id', tripManagerController.softDeleteSavedTrip); // Soft delete a saved trip

/**
 * @swagger
 * /trips/saved/{id}/restore:
 *   put:
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
router.put(
  '/trips/saved/:id/restore',
  tripManagerController.restoreDeletedTrip
); // Restore a soft-deleted trip

export default router;
