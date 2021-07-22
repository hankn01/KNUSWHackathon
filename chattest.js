


var express = require('express');
var app = express();
var mongoose = require('mongoose');
var http = require('http').Server(app); //1
var io = require('socket.io')(http);    //1
var fs = require('fs');
app.get('/jieum',function(req, res){  //2
  res.sendFile(__dirname + '/client.html');
});



mongoose.connect('mongodb://localhost:27017/moim');
var db = mongoose.connection;
db.on('error', function() {
    console.log("DB NOT CONNECTED");
});
db.once('open', function() {
   console.log('CONNECTED'); 
});

var moim = mongoose.Schema({
    name: 'string',
    kind: 'string',
    date: 'string',
    time: 'string',
    need: 'boolean',
    member: 'Array'
});
var Moimdata = mongoose.model('Schema', moim);

var count=1;
io.on('connection', function(socket){ //3
  console.log('user connected: ', socket.id);  //3-1
  var name = "user" + count++;                 //3-1
  io.to(socket.id).emit('change name',name);   //3-1

  socket.on('disconnect', function(){ //3-2
    console.log('user disconnected: ', socket.id);
  });

  socket.on('send message', function(name,text){ //3-3
    var msg = name + ' : ' + text;
    console.log(msg);
    io.emit('receive message', msg);
  });
});


app.post('/addmoim', (req, res)=> {
    
});
app.post('/deletemoim', (req, res) => {

});
app.post('/addbuilding', (req, res) => {

});
app.post('/opengate', (req, res) => {

});

app.post('/addmem', (req, res) => {

});
app.post('/delmem', (req, res) => {

});



app.get('/', (req, res) => {
    fs.readFile('./public/index.html', 'UTF-8', function(err, data) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        res.end();


    })});

app.get('/moyeora', (req, res) => {
    fs.readFile('./public/moyeora.html', 'UTF-8', function(err, data) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        res.end();

})});
http.listen(3000, function(){ //4
  console.log('server on!');
});