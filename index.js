var moment = require('moment');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

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

app.listen(8080, function () {
  console.log('App listening on port 8080!');
});

function parseDate(inDate) { 
   var outDate = Date.parse(inDate);
   if(isNaN(outDate)) return null;
   return outDate;
}