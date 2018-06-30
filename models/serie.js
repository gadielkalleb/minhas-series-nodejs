const mongoose = require('mongoose')

const SerieShema = mongoose.Schema({
  name: { 
    type:String,
    required: true
  },
  status: {
    type: String,
    enumValues: ['para-assistir', 'assistindo', 'assistido']
  },
  comments: [String]
})

const Serie = mongoose.model('Serie', SerieShema)

module.exports = Serie