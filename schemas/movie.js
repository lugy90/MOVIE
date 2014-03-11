var mongoose = require('mongoose')

var MovieSchema = new mongoose.Schema({
  doctor: String,
  title: String,
  language: String,
  country: String,
  year: Number,
  summary: String,
  poster: String,
  flash: String,
  meta: {
    createAt: {
      type: Date,
      default: Date.now()
    },
    updatedAt: {
      type: Date,
      default: Date.now()
    }
  }
})

MovieSchema.pre('save', function(next) {
  if (this.isNew) {
    this.meta.createAt = this.meta.updatedAt = Date.now()
  }
  else {
    this.meta.updatedAt = Date.now()
  }

  next()
})

MovieSchema.statics = {
  fetch: function(cb) {
    return this
      .find({})
      .sort('meta.updatedAt')
      .exec(cb)
  },
  findById: function(id, cb) {
    return this
      .findOne({_id: id})
      .exec(cb)
  }
}

module.exports = MovieSchema