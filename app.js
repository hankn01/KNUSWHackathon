const express = require('express')
const fs = require('fs')
const cors = require('cors')
const { request } = require('http')
const app = express()
const port = 3000
const http = require('http')
app.use(cors());


app.get('/', (req, res) => {
    fs.readFile('./res/index.html', 'UTF-8', function(err, data) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        res.end();


    });
    


})

app.post('/addmoim', (req, res)=> {
    
});
app.post('/addmem', (req, res) => {

});
app.post('/delmem', (req, res) => {

});

app.post('/deletemoim', (req, res) => {

});
app.post('/addbuilding', (req, res) => {

});
app.post('/opengate', (req, res) => {

});



app.listen(port, () => {
    console.log("Server started PORT: "+port);
});

var server = http.createServer(app).listen(app.get('port'), function() {
	console.log('Chat Server Started. Port'+app.get('port'));
});