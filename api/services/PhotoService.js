const baseJoi = require('joi');
const extension = require('joi-date-extensions');
const Joi = baseJoi.extend(extension);
const GridModel = require('../models/GridModel');

const PhotoService = {

  /**
   * Saving a new photo grid for a given user
   * 
   * @param {*} request 
   * @param {*} userId 
   * @returns array
   */
  save: async (request, userId) => {
    
    const validateSchema = Joi.object().keys({
      images: Joi.array().required().min(9).max(9).items(
        Joi.object().keys({
          id: Joi.string().required(),
          url: Joi.string().required()
        })
      )
    });
    const validation = Joi.validate(request, validateSchema);
    if (validation.error) {
      let errorMessage = validation.error.details.shift();
      errorMessage = errorMessage.message;
      throw errorMessage;
    }
    const grid = {
      title: 'My photo grid',
      user: userId,
      images: request.images
    };
    const gridSavingResponse = await GridModel.findOneAndUpdate(
      { user: userId },
      grid,
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
    return gridSavingResponse.images;
  },

  /**
   * Get photo grid images for selected user by id
   * 
   * @param {*} userId 
   * @returns array
   */
  getGridByUser: async (userId) => {

    const grid = await GridModel.findOne({ user: userId }).lean();
    return (grid && grid.images) ? grid.images : [];
  }
};

module.exports = PhotoService;
