var mongoose =require('./db.js').mongoose;
var  autoIncrement=require('./db.js').autoIncrement;

var mapImageSchema = mongoose.Schema({ 
name: String,
message: String
});

mapImageSchema.plugin(autoIncrement.plugin, 'MapImage');

var MapImage = mongoose.model('MapImage',mapImageSchema);

exports.MapImage=MapImage;


