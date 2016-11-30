var mongoose = require('mongoose');

var ReuseLib = mongoose.model('ReuseLib', {
  partName: String,
  numItems: Number,
  partSize: Number
});

module.exports = {ReuseLib};
