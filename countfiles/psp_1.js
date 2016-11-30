//Module: psp1.js
// mean and standard dev calculations
// TODO: refactor to mathHelper library
require('./config/config');

var {mongoose} = require('./db/mongoose');
var {ProjectData} = require('./models/estimating');

//const port = process.env.PORT;


var proxySizes = [160, 591,114,229,230, 270, 128, 1657, 624, 1503];
var devHours = [15.0, 69.9, 6.5, 22.4, 28.4, 65.9, 19.4, 198.7, 38.8,138.2];

pData = new ProjectData;
pData.proxySizes = proxySizes;
pData.devHours = devHours;

pData.save().then((doc) => {
  console.log(doc);
}, (e) => {
  console.log('an error occurred in save');
});
//function: round
function round(value, decimals) {
  return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}
//function: mean
var mean = (nums) => {
  var res = nums.reduce(function(a, b) {return a+b}, 0)/nums.length;
  return round(res, 2);
};
//function: square
var square = (num) => {
  return num * num;
}
//function: standard deviation
var stDev = (nums) => {
  var numerSquares = [];
  var m = mean(nums);

  nums.forEach( function(x) {
    var t = (x - m);
    var s = square(t);
    numerSquares.push(s);
  });

  return round(Math.sqrt(numerSquares.reduce(function (a, b) {return a + b}, 0)/ (numerSquares.length - 1)), 2);
}

var r1 = stDev(pData.proxySizes);
console.log(r1);
