const express = require('express');
const router = express.Router();
const Authorization = require('../middlewares/Authorization');
const PhotoController = require('../controllers/v1/PhotoController');


router.get('/images', Authorization, PhotoController.getUploadedPhotos);

router.get('/grid', Authorization, PhotoController.getGrid);
router.post('/grid', Authorization, PhotoController.saveGrid);
router.put('/grid', Authorization, PhotoController.updateGrid);

module.exports = router;
