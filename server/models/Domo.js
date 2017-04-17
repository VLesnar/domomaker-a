const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const _ = require('underscore');

let DomoModel = {};

const convertId = mongoose.Types.ObjectId;
const setName = (name) => _.escape(name).trim();

const DomoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    set: setName,
  },
  age: {
    type: Number,
    min: 0,
    required: true,
  },
  strength: {
    type: Number,
    min: 5,
    required: true,
  },
  agility: {
    type: Number,
    min: 5,
    required: true,
  },
  intelligence: {
    type: Number,
    min: 5,
    required: true,
  },
  charisma: {
    type: Number,
    min: 5,
    required: true,
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

DomoSchema.statics.toAPI = (doc) => ({
  name: doc.name,
  age: doc.age,
  strength: doc.strength,
  agility: doc.agility,
  intelligence: doc.intelligence,
  charisma: doc.charisma,
});

DomoSchema.statics.findByOwner = (ownerId, callback) => {
  const search = {
    owner: convertId(ownerId),
  };

  return DomoModel.find(search).select('name age strength agility' +
                                       'intelligence charisma').exec(callback);
};

DomoModel = mongoose.model('Domo', DomoSchema);

module.exports.DomoModel = DomoModel;
module.exports.DomoSchema = DomoSchema;
