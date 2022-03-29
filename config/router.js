import express from 'express';
import secureRoute from '../middleware/secureRoute.js';

import commentsController from '../controllers/commentsController.js';
import spotsController from '../controllers/spotsController.js';
import usersController from '../controllers/usersController.js';
import likesController from '../controllers/likesController.js';
import search from '../controllers/search.js';

const router = express.Router();

router
  .route('/spots')
  .get(spotsController.getAllSpots)
  .post(secureRoute, spotsController.createSpot); // logged in

router
  .route('/spots/:spotId')
  .get(spotsController.getSpotById)
  .put(secureRoute, spotsController.editSpot) // users own
  .delete(secureRoute, spotsController.deleteSpot); // users own

router
  .route('/spots/:id/comments')
  .post(secureRoute, commentsController.createComment); // logged in

router
  .route('/spots/:id/comments/:commentId')
  .delete(secureRoute, commentsController.deleteComment) // users own
  .put(secureRoute, commentsController.updateComment); // users own

router.route('/register').post(usersController.registerUser);

router.route('/login').post(usersController.loginUser);

router.route('/users').get(usersController.getAllUsers);

router.route('/users/:userId').get(usersController.getUserById);

router.route('/spots/:id/likes').put(secureRoute, likesController.like);

router.route('/search').get(search.searchSpots);

export default router;
