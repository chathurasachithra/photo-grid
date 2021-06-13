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
    return grid.images;
  },
};

module.exports = PhotoService;
