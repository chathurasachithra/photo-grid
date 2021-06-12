const express = require('express');
const router = express.Router();
const PhotoController = require('../controllers/v1/PhotoController');

router.get('/images', PhotoController.getUploadedPhotos);
router.get('/grid', PhotoController.getGrid);
router.post('/grid', PhotoController.saveSelectedImages);

module.exports = router;
