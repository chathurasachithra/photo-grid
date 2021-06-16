const ResponseService = require('../../services/ResponseService');
const GridService = require('../../services/GridService');
const photoJson = require('../../resources/CHhASmTpKjaHyAsSaauThRqMMjWanYkQ.json');
const log = require('simple-node-logger').createSimpleLogger();
const _ = require('lodash');

const PhotoController = {

  /**
   * Get list of the photos uploaded by user
   * 
   * @param {*} request 
   * @param {*} response 
   */
  getUploadedPhotos: async (request, response) => {

    try {
      const hostname = request.headers.host;
      const imageList = _.cloneDeep(photoJson.entries).map(photoObject => {
        photoObject.picture = `http://${hostname}/images/${photoObject.picture}`;
        return photoObject;
      });
      ResponseService.success(response, imageList);
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
   saveGrid: async (request, response) => {

    try {
      const userId = request.user.id; 
      const result = await GridService.save(request.body, userId);
      ResponseService.success(response, result);
    } catch (error) {
      log.error('PhotoController saveGrid error ', error);
      ResponseService.error(response, error);
    }
  },

  /**
   * Update image order or update grid by new images of a grid
   * 
   * @param {*} request 
   * @param {*} response 
   */
   updateGrid: async (request, response) => {

    try {
      const userId = request.user.id; 
      const result = await GridService.update(request.body, userId);
      ResponseService.success(response, result);
    } catch (error) {
      log.error('PhotoController updateGrid error ', error);
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
      const result = await GridService.getGridByUser(userId);
      ResponseService.success(response, result);
    } catch (error) {
      log.error('PhotoController getGrid error ', error);
      ResponseService.error(response, err.message);
    }
  }
};
module.exports = PhotoController;
