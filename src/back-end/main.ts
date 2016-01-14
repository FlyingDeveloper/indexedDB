import * as express from "express";
import * as fs from "fs";

var app = express();
var modifiedTime = fs.statSync('./src/back-end/main.ts').mtime;

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', function(req, res) {
    res.set('Content-Type', 'application/json');
    res.set('Last-Modified', modifiedTime.toISOString());
    res.send(JSON.stringify({
        firstName: 'Bill',
        lastName: 'Gates'
    }));
});

var server = app.listen(20380, function() {
    var address = server.address().address;
    var port = server.address().port;
    console.log(address);
    console.log(`Listening at http://${address}:${port}`);
});