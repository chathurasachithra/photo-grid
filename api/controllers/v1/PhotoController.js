const ResponseService = require('../../services/ResponseService');
const PhotoService = require('../../services/PhotoService');
const photoJson = require('../../resources/CHhASmTpKjaHyAsSaauThRqMMjWanYkQ.json');
const log = require('simple-node-logger').createSimpleLogger();


const PhotoController = {

  /**
   * Get list of the photos uploaded by user
   * 
   * @param {*} req 
   * @param {*} res 
   */
  getUploadedPhotos: async (req, res) => {
    try {
      ResponseService.success(res, photoJson);
    } catch (error) {
      log.error('PhotoController getUploadedPhotos error ', error);
      ResponseService.error(res, error.message);
    }
  },

  /**
   * Save images for the grid selected by user
   * 
   * @param {*} request 
   * @param {*} response 
   */
   saveSelectedImages: async (request, response) => {
    try {
      //TODO need to implement user registration/ login and authentication
      const userId = '5ffec928e083f6d8a52ad107'; 
      const result = await PhotoService.save(request.body, userId);
      ResponseService.success(response, result);
    } catch (error) {
      log.error('PhotoController create error ', error);
      ResponseService.error(response, error);
    }
  },

  /**
   * Get grid by user
   * 
   * @param {*} req 
   * @param {*} res 
   */
  getGrid: async (req, res) => {
    try {
      //TODO new to implement user registration/ login and authentication
      const userId = '5ffec928e083f6d8a52ad107';
      const result = await PhotoService.getGridByUser(userId);
      ResponseService.success(res, result);
    } catch (error) {
      log.error('PhotoController getAuctionsToHome error ', error);
      ResponseService.error(res, err.message);
    }
  }
};
module.exports = PhotoController;
