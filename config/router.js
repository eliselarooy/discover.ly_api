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

router.route('/spots/:id/comments').post(commentsController.createComment);

router.route('/spots/:id/comments/:commentId');

router
  .route('/spots/:id/comments/:commentId')
  .delete(commentsController.deleteComment)
  .put(commentsController.updateComment);

router.route('/register').post(usersController.registerUser);

router.route('/login').post(usersController.loginUser);
// routes for user profiles

export default router;
