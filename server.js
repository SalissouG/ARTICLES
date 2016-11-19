var cookieSession = require('cookie-session')
var express=require('express');
var bodyParser=require('body-parser');
var multer = require('multer');
var crypto=require('crypto');
var fs=require('fs');
var mime=require('mime');
var path=require('path');
//var MapImage= require('./mapImage.js').MapImage;
//var Evenement= require('./evenement.js').Evenement;


var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads')
  },
  filename: function (req, file, cb) {
    crypto.pseudoRandomBytes(16, function (err, raw) {
      cb(null, raw.toString('hex') + Date.now() + '.' + mime.extension(file.mimetype));
    });
  }
});

var upload = multer({ storage: storage });

var app=express();
var port=3005;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2']
}))

// CORS Support
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use(express.static(path.join(__dirname, 'public')));



app.get('/aprr-nav',function(req,res){
      res.render("home-nav.ejs");
});

app.get('/ffa',function(req,res){
      res.render("accueil.ejs");
});

app.get('/aprr',function(req,res){
      res.render("home.ejs");
});



app.get('/up',function(req,res){
      res.render("up.ejs");
});


app.get('/download', function(req, res){
  var file = __dirname + '/upload-folder/dramaticpenguin.MOV';
  res.download(file); // Set disposition and send it.
});




app.get('/im',function(req,res){

MapImage.find(function(err ,mapImages){
if(err)
{
console.log(err);
}
else{
res.render("page.ejs",{images:mapImages});
}

});

});


app.get('/',function(req,res){

/*  MapImage.find({},function(err ,mapImages){
  if(err)
  {
    console.log(err);
  }
  else{

            /*   Evenement.find({},function(err ,evenements){
                    if(err)
                    {
                           console.log(err);
                    }
                    else
                        {*/
                          //  res.render("accueil.ejs",{images:mapImages});
                        /* }

                   });*/



    //  }
  // });

  res.render("accueil.ejs");

});

app.get('/suppression/:id',function(req,res){

MapImage.remove({_id: req.params.id},function(err ,mapImages){
if(err)
{
console.log(err);
}
else{

console.log(mapImages);
}
});

MapImage.find({},function(err ,mapImages){
if(err)
{
console.log(err);
}
else{
res.render("admin.ejs",{images: mapImages});
}
});




});


app.get('/hellobdd',function(req,res){
MapImage.find({},function(err ,mapImages){
if(err)
{
console.log(err);
}
else{
res.send(mapImages);
}
});

});

app.get('/remove',function(req,res){

MapImage.remove({},function(err ,mapImages){
if(err)
{
console.log(err);
}
else{
res.send(mapImages);
}
});

});






app.get('/id',function(req,res){

MapImage.find({},function(err ,mapImages){
if(err)
{
console.log(err);
}
else{
res.send(mapImages);

}
}).limit(30);

});





app.post('/upload',upload.single('file'),function(req,res){

var message = req.body.message;
var titre = req.body.titre;
var auteur = req.body.auteur;
var heure = req.body.heure;
var minute = req.body.minute;
var date = req.body.date;

var mapImage= new MapImage({ name:req.file.filename, message: message , titre : titre ,
                                       auteur: auteur, heure : heure, minute : minute, date : date});
mapImage.save(function(err,mapImage){
if(err)
{
console.log('ERROR');
console.log(err);
}
});
res.send("ok");
});

app.listen(port, function(){
	console.log('Working on port '+port);
})
