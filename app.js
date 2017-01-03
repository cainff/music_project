var server = require('http').createServer();
var express = require('express');
var app = express();
var http = require('http').Server(app);
var fs = require('fs');
var junk = require('junk');





app.use('/css', express.static(__dirname + '/css'));
app.use('/js', express.static(__dirname + '/js'));
app.use('/img', express.static(__dirname + '/img'));
app.use('/music', express.static(__dirname + '/music'));
app.use('/pnl', express.static(__dirname + '/pnl'));
app.use('/theweeknd', express.static(__dirname + '/theweeknd'));
app.use('/gradur', express.static(__dirname + '/gradur'));
app.use('/coldplay', express.static(__dirname + '/coldplay'));
app.use('/fakear', express.static(__dirname + '/fakear'));
app.use('/justice', express.static(__dirname + '/justice'));
app.use('/sethgueko', express.static(__dirname + '/sethgueko'));
app.use('/jul', express.static(__dirname + '/jul'));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/html/projet.html');
});

app.get('/album', function (req, res) {
    res.sendFile(__dirname + '/html/projetp2.html');
});

app.get('/player', function (req, res) {
    res.sendFile(__dirname + '/html/audio.html');
});

app.get('/getmusic', function (req, res) {
    
    var musicfolder = __dirname + '/' + req.query.folder;
    
    fs.readdir(musicfolder, function(err, files){
        files = files.filter(junk.not)
        for(var i=0;i<files.length;i++){
            files[i] = 'http://localhost:1337/'+req.query.folder+'/'+ files[i];
            
            if(i === files.length-1)
                res.send(files);
        }
    })
});

http.listen(1337, function(){
        console.log('listening on *:1337');
});


