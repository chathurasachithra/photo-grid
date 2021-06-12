const config = require('config');
const baseJoi = require('joi');
const extension = require('joi-date-extensions');
const mongoose = require('mongoose');
const moment = require('moment');
const _ = require('lodash');

const Joi = baseJoi.extend(extension);
const Constants = require('./Constants');
const GridModel = require('../models/GridModel');
const { newAuctionValidateSchema } = require('../schemas/AuctionSchema');

const PhotoService = {

  save: async (request, userId) => {
    const auction = {
      title: 'My photo grid',
      user: userId,
      images: request.images
    };
    const auctionResponse = await GridModel.create(auction);
    return auctionResponse;
  },

  getGridByUser: async (userId) => {
    const auction = await GridModel.findOne({ user: userId }).lean();
    return auction.images;
  },
};

module.exports = PhotoService;
