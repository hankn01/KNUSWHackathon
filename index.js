const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.send("경북대학교 스마트 학생 시스템");
})

app.listen(port, () => {
    console.log("Server started PORT: "+port);
});

