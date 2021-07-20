const express = require('express')
const fs = require('fs')
const { request } = require('http')
const app = express()
const port = 3000

app.get('/', (req, res) => {
    fs.readFile('./res/index.html', 'UTF-8', function(err, data) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        res.end();


    });
    


})

app.listen(port, () => {
    console.log("Server started PORT: "+port);
});

