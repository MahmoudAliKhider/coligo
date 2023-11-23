const express = require('express');
const announcementController = require('../controllers/announcementController');
const authService = require('../controllers/authController');

const router = express.Router()

router.post('/', authService.protect, announcementController.createAnnouncement);
router.get('/', authService.protect, announcementController.getAllAnnouncements);
router.get('/:announcementId', authService.protect, announcementController.getAnnouncementById);
router.put('/:announcementId', authService.protect, announcementController.updateAnnouncement);
router.delete('/:announcementId', authService.protect, announcementController.deleteAnnouncement);

module.exports = router;
