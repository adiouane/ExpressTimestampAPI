// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC . FCC means in this case FreeCodeCamp
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
// This is the line that tells our server to use the public folder as our root directory. for static files like css and js
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

const checkDate = (date) => {
 if (date.toUTCString() === "Invalid Date"){
   return true;
 }
}


// your first API endpoint... 
app.get("/api/:date", function (req, res) {
  let date = new Date(req.params.date);
  if (checkDate(date)){
    date = new Date(+req.params.date); // if date is in unix format
    // the + sign converts the string to a number
  }
  if (checkDate(date)){
    res.json({error: "Invalid Date"});
    return;
  }
  res.json({unix: date.getTime(), utc: date.toUTCString()});
});

app.get("/api", function (req, res) {
  let date = new Date();
  res.json({unix: date.getTime(), utc: date.toUTCString()});
});


// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
