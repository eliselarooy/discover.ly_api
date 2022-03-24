import express from 'express';

import commentsController from '../controllers/commentsController.js';
import spotsController from '../controllers/spotsController.js';
import usersController from '../controllers/usersController.js';

const router = express.Router();

router
  .route('/spots')
  .get(spotsController.getAllSpots)
  .post(spotsController.createSpot);

router
  .route('/spots/:id')
  .get(spotsController.getSpotById)
  .put(spotsController.editSpot)
  .delete(spotsController.deleteSpot);

//routes for user profiles
