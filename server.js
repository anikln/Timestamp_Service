// server.js
// where your node app starts

// init project
const express = require('express');
const app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

app.get('/api/timestamp/:date_string',function(req, res) {
  var inputDate = Date.parse(req.params.date_string);
  if(!isNaN(inputDate)){
    req.time = new Date(req.params.date_string).toUTCString();
    res.json({"unix": inputDate,"utc": req.time});
  }
  else{
    //req.time = new Date().toString(); // Hypothetical synchronous operation
    //res.json({time: req.time});
    res.json({"error" : "Invalid Date" });
  }
 // //response.sendFile(__dirname + '/views/index.html');
});
app.get('/api/timestamp',function(req, res) {
  req.time = new Date().toUTCString(); 
  req.unix = new Date(req.time).getTime();
  res.json({"unix": req.unix,"utc": req.time});
  //  res.send("req.params.date_string");
  //response.sendFile(__dirname + '/views/index.html');
});
// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function(request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
