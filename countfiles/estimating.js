//Module: estimating.js -- model for proxies
//function: main
var mongoose = require('mongoose');

var ProjectData = mongoose.model('ProjectData', {
  proxySizes: [],
  devHours: [] //modified
});

//deleted
//deleted

module.exports = {ProjectData};
