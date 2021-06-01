const mongoose = require('mongoose')

const DevSchema2 = new mongoose.Schema({
  name: String,
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      index: '2dsphere',
      required: true
    },
    properties: {
      nickname: { type: String, required: true},
      ageGroup: { type: String, required: true},
      gender: { type: String, required: true},
      nessDistance: {type: Number, required: true},
    }
  }

})

module.exports = mongoose.model('Dev2', DevSchema2)