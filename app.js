var request = require('request')


var express = require('express');
var app = express();
var mongoose = require('mongoose');
var http = require('http').Server(app); //1
var io = require('socket.io')(http);    //1
var fs = require('fs');
var ejs = require('ejs');
var msg = require('dialog');
const { callbackify } = require('util');


app.use('/public', express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname+'/public'))

app.set('views', __dirname + '/');
app.set('view engine', 'ejs');

const url = "https://api.odcloud.kr/api/15080665/v1/uddi:6377af05-8fed-484c-868b-a9a72fcb0089?page=20&perPage=10&returnType=JSON&serviceKey=data-portal-test-key";

var info = null;
request(url, (err, response, body)=> {
    if(err) throw err;
    console.log(body);

    info = JSON.parse(body);

    for(i in info['data']) {
        console.log(info['data'][i]['구분']);
        console.log(info['data'][i]['날짜']);
        console.log(info['data'][i]['확진자 수(명)']);
    }
    
});

mongoose.connect('mongodb://localhost:27017/moim');
var db = mongoose.connection;
db.on('error', function() {
    console.log("DB NOT CONNECTED");
});
db.once('open', function() {
   console.log('CONNECTED'); 
});

var moimSchema = mongoose.Schema({
    name: {type: String, required: true},
    password: {type: String, required: true},
    kind: String,
    date: {type: Date, default: Date.now},
    place: {type: String},
    need: String,
    member: {
        type:String
    }
});
var Moimdata = mongoose.model('Moim', moimSchema);

var count=1;
io.on('connection', function(socket){ //3
  console.log('user connected: ', socket.id);  //3-1
  var name = "익명 사용자 " + count++;                 //3-1
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

app.get('/', (req, res)=> res.render("index", {page: "index", Info: info}));

app.get('/newmoim', (req, res) => res.render("signup", {page: "signup"}));

app.post('/addmoim', (req, res)=> {
    console.log(req.body);
    Moimdata.create({name:req.body.name,
        password: req.body.password,
        kind: req.body.kind,
        date: req.body.date,
        place: req.body.place,
        need: req.body.need,
        member: req.body.member
        });

    
});
app.post('/delmoim', (req, res) => {
    Moimdata.findOneAndDelete({name: req.body.name, password: req.body.password}, (err, doc) => {
        if (err) {
            console.log("Something wrong when removing data!");
        }
        if(doc===null)
        {
            msg.err("해당 모임이 없습니다.");
        }
        console.log(doc);
    });

});
app.post('/addbuilding', (req, res) => {

});
app.post('/opengate', (req, res) => {

});

app.post('/addmem', (req, res) => {
    Moimdata.findOneAndUpdate({name: req.body.name, password: req.body.password}, {$set:{member:req.body.member}}, {new: true}, (err, doc) => {
        if (err) {
            console.log("Something wrong when updating data!");
        }
        if(doc===null)
        {
            msg.err("해당 모임이 없습니다.");
        }
        
        console.log(doc);
    });
});
app.get('/modwind', (req, res) => res.render("modify", {page: "modify"}));
app.get('/delwind', (req, res) => res.render("delete", {page: "delete"}));

app.get('/ind', (req, res) => res.render("index", {page: "index", Info: info}));


/*
app.get('/', (req, res) => {
  


    fs.readFile('./public/index.html', 'UTF-8', function(err, data) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        res.end();


    }
    //https://api.odcloud.kr/api/15080665/v1/uddi:6377af05-8fed-484c-868b-a9a72fcb0089?page=1&perPage=10&returnType=JSON&serviceKey=data-portal-test-key
    
    )});
*/
app.get("/moyeora", function(req, res) {
    Moimdata.find({}, function(err, allDetails) {
        if(err) {
            console.log(err);
        } else {
            res.render("moyeora", {details: allDetails})
        }
    })
})

/*
app.get('/moyeora', (req, res) => {
    fs.readFile('./public/moyeora.html', 'UTF-8', function(err, data) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        res.end();

})});
*/

app.get('/jieum',function(req, res){  //2
    fs.readFile('./public/client.html', 'UTF-8', function(err, data) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        res.end();
    })});

http.listen(3000, function(){ //4
  console.log('server on!');
});