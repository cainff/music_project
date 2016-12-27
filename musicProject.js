var express = require('express');
var app = express();
var http = require('http').Server(app);


app.get('/', function(req, res){
  res.send(__dirname + '/dev/html/projet.html');
});

app.get('/test', function(req, res){
  res.send('<h1>Hello TEST</h1>');
});

app.use('/css' , express.static(__dirname + '/dev/css'));
app.use('/js' , express.static(__dirname + '/dev/js'));
app.use('/img' , express.static(__dirname + '/dev/img'));

http.listen(1337, function(){ 
    console.log('listening on *:1337');
});