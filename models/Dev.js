const mongoose = require('mongoose')

const DevSchema = new mongoose.Schema({
  nickname: {
    type: String,
    required: true,
  },
  ageGroup: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  lat: {
    type: String,
    required: true,
  },
  lng: {
    type: String,
    required: true,
  },
  nessDistance: {
    type: Number,
    required: true,
  },
})

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
      required: true
    },
    properties: {
      nickname: {
        type: String,
        required: true
      },
      ageGroup: {
        type: String,
        required: true
      },
      gender: {
        type: String,
        required: true
      },
      nessDistance: {
        type: Number,
        required: true
      },
    }
  }
})

module.exports = mongoose.model('Dev', DevSchema)