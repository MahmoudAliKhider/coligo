const express = require('express');
const announcementController = require('../controllers/announcementController');
const authService = require('../controllers/authController');

const router = express.Router();

router.post('/', authService.protect, authService.allowedTo('admin'), announcementController.createAnnouncement);
router.get('/', authService.protect, announcementController.getAllAnnouncements);
router.get('/:announcementId', authService.protect, announcementController.getAnnouncementById);
router.put('/:announcementId', authService.protect,authService.allowedTo('admin'), announcementController.updateAnnouncement);
router.delete('/:announcementId', authService.protect, authService.allowedTo('admin'), announcementController.deleteAnnouncement);

module.exports = router;
