var mongoose = require('mongoose');
  autoIncrement = require('mongoose-auto-increment');

     mongoose.connect('mongodb://localhost/mapImage'); 

var db= mongoose.connection; 

autoIncrement.initialize(db);

db.on('error', function(error){
console.log('Warning !**** mongoDB error');
console.log(error);
});

db.on('on', function(){
console.log('**** mongoDB ok');
});

exports.mongoose= mongoose;
exports.autoIncrement=autoIncrement;
