import Notification from '../models/notificationModel.js';

// @desc   Add new notification
// @route  POST /api/notifications
export const addNotification = async (req, res) => {
  try {
    const { type, title, desc, user } = req.body;

    const newNotification = new Notification({
      type,
      title,
      desc,
      user,
      time: new Date().toLocaleString('en-IN'), // Optional if default is set in schema
    });

    await newNotification.save();
    res.status(201).json({ success: true, message: 'Notification added', data: newNotification });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to add notification', error: err.message });
  }
};

// @desc   Get all notifications
// @route  GET /api/notifications
export const getAllNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: notifications });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch notifications', error: err.message });
  }
};

// @desc   Delete a notification
// @route  DELETE /api/notifications/:id
export const deleteNotification = async (req, res) => {
  try {
    const { id } = req.params;
    const notification = await Notification.findById(id);

    if (!notification) {
      return res.status(404).json({ success: false, message: 'Notification not found' });
    }

    await notification.deleteOne();
    res.status(200).json({ success: true, message: 'Notification deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to delete notification', error: err.message });
  }
};
