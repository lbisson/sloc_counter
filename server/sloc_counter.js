//Module: SlocCounter
var yargs = require('yargs');
var argv = require('yargs').argv;
var LineByLineReader = require('line-by-line');

require('./config/config');
var {mongoose} = require('./db/mongoose');
var {ReuseLib} = require('./models/reuseLib');

var totalLines = 0;

argv._.forEach( function(doc) {
  var items = 0;
  var partSize = 0;
  var modified = 0;
  var deleted = 0;
  var partName = "SlocMain";

  lr = new LineByLineReader(doc);

  lr.on('error', function (err) {
  	console.log('There was a problem reading the file.')
  });

  lr.on('line', function (line) {
    if (line.includes('//Module:')) {
      var l = line.split(' ');
      partName = l[1];
      console.log('Name in line: ', partName);
    } else if (line.includes('//deleted')) {
      deleted += 1;
    } else if (line.includes('//function')) {
      items += 1;
    } else if (
        line.includes(';') ||
        line.includes(':') ||
        line.includes('.') ||
        line.includes('=>') ||
        line.includes('if') ||
        line.includes('else') ||
        line.includes('function')) {
          totalLines +=1;
          partSize += 1;
          if (line.includes('//modified')) {
            modified += 1;
          }
        }
  });

  lr.on('end', function () {
    console.log('Part: ', partName);
    console.log('Items: ', items);
    console.log('Part Size: ', partSize);
    console.log('Total Lines: ', totalLines);
    console.log('Deleted: ', deleted);
    console.log('Modified: ', modified);
    var pspModule = new ReuseLib();
    pspModule.partName = partName,
    pspModule.numItems = items,
    pspModule.partSize = partSize;
    pspModule.save().then((doc) => {
      console.log('Success');
    }, (e) => {
      console.log('Error saving data');
    });

    partSize = 0;
    items = 0;

  });

});
