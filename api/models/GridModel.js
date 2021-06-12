const mongoose = require('mongoose');

const { Schema, Types } = mongoose;
const gridSchema = new Schema({

  title: String,
  user: {
    type: Types.ObjectId,
    default: null
  },
  images: {
    type: Array,
    default: [],
  },
  status: {
    type: String,
    enum: ['active', 'deleted'],
    default: 'active',
  }
}, { timestamps: true, collation: { locale: 'en_US', strength: 1 } });

module.exports = mongoose.model('Grid', gridSchema);