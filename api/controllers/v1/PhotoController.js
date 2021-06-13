const baseJoi = require('joi');
const extension = require('joi-date-extensions');
const Joi = baseJoi.extend(extension);
const ResponseService = require('../../services/ResponseService');
const PhotoService = require('../../services/PhotoService');
const photoJson = require('../../resources/CHhASmTpKjaHyAsSaauThRqMMjWanYkQ.json');
const log = require('simple-node-logger').createSimpleLogger();

const PhotoController = {

  /**
   * Get list of the photos uploaded by user
   * 
   * @param {*} request 
   * @param {*} response 
   */
  getUploadedPhotos: async (request, response) => {
    try {
      ResponseService.success(response, photoJson);
    } catch (error) {
      log.error('PhotoController getUploadedPhotos error ', error);
      ResponseService.error(response, error.message);
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
      const userId = request.user.id; 
      const validateSchema = Joi.object().keys({
        images: Joi.array().required(),
      });
      const validation = Joi.validate(request.body, validateSchema);
      if (validation.error) {
        let errorMessage = validation.error.details.shift();
        errorMessage = errorMessage.message;
        throw new Error(errorMessage);
      }
      const result = await PhotoService.save(request.body, userId);
      ResponseService.success(response, result);
    } catch (error) {
      log.error('PhotoController saveSelectedImages error ', error);
      ResponseService.error(response, error);
    }
  },

  /**
   * Get grid by user
   * 
   * @param {*} request 
   * @param {*} response 
   */
  getGrid: async (request, response) => {
    try {
      const userId = request.user.id; 
      const result = await PhotoService.getGridByUser(userId);
      ResponseService.success(response, result);
    } catch (error) {
      log.error('PhotoController getGrid error ', error);
      ResponseService.error(response, err.message);
    }
  }
};
module.exports = PhotoController;
