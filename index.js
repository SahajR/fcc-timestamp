var moment = require('moment');
var express = require('express');
var app = express(), port = process.env.PORT || 8080;
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function(req, res){
  res.send("Please input some timestamp or date to test the microservice!");
});

app.get('/:num', function (req, res) {
  var d = {};
  var udate = parseDate(req.params.num);
  var ndate = moment.unix(req.params.num);
  if(udate == -1 && !ndate.isValid()) {
      d.unix = null;
      d.natural = null;
  } else {
      if(udate != -1) {
          d.unix = udate/1000;
          d.natural = req.params.num;
      } else if (ndate.isValid()) {
          d.unix = Number(req.params.num);
          d.natural = ndate.format("MMM DD, YYYY");
      }
  }
  
  res.setHeader('Content-Type', 'application/json');
  res.send(d);
});

app.listen(port, function () {
  console.log('App listening on port ' + port + '!');
});

function parseDate(inDate) { 
   var outDate = Date.parse(inDate);
   if(isNaN(outDate)) return -1;
   return outDate;
}