const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
const _ = require('underscore');

let WatchModel = {};

// mongoose.Types.ObjectID is a function that
// converts string ID to real mongo ID
const convertId = mongoose.Types.ObjectId;
const setName = (name) => _.escape(name).trim();

const WatchSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    set: setName,
  },
    
  watchType: {
    type: String,
    required: true,
    trim: true,
  },

  link: {
    type: String,
    required: false,
    trim: true,
  },

  owner: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'Account',
  },

  createdData: {
    type: Date,
    default: Date.now,
  },
});

WatchSchema.statics.toAPI = (doc) => ({
  title: doc.title,
  watchType: doc.watchType,
  link: doc.link,
});

WatchSchema.statics.findByOwner = (ownerId, callback) => {
  const search = {
    owner: convertId(ownerId),
  };

  return WatchModel.find(search).select('title watchType link').lean().exec(callback);
};


WatchModel = mongoose.model('Watch', WatchSchema);

module.exports.WatchModel = WatchModel;
module.exports.WatchSchema = WatchSchema;
