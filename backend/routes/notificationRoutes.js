import express from 'express';
import {
  addNotification,
  getAllNotifications,
  deleteNotification,
} from '../controllers/notificationController.js';

const notificationRouter = express.Router();

notificationRouter.post('/', addNotification);
notificationRouter.get('/', getAllNotifications);
notificationRouter.delete('/:id', deleteNotification);

export default notificationRouter;
