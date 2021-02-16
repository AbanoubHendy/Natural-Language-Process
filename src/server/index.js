const dotenv = require('dotenv');
dotenv.config();
var path = require('path')
const express = require('express')
const cors = require('cors')
const mockAPIResponse = require('./mockAPI.js')
const apiKey = process.env.API_KEY;
var https = require('follow-redirects').https;
var fs = require('fs');
console.log(`Your API key is ${process.env.API_KEY}`);
const app = express()
app.use(cors())

projectData = {};

app.use(express.static('dist'))

console.log(__dirname)

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
    //res.sendFile(path.resolve('src/client/views/index.html'))
})

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Example app listening on port 8081!')
})

app.get('/test', function (req, res) {
    res.send(projectData)
})

app.post('/add', async function(req, res) {
    const Base_URL ='https://api.meaningcloud.com/sentiment-2.1?';
    const {userUrl} = req.body;
    //URL meaning cloud API
    const URL = `${Base_URL}key=${apiKey}&url=${userUrl}&lang=en`;
    const response = await fetch(URL)
    try{
    const data = await response.json()
    projectData = {
        score_tag:data.score_tag,
        agreement:data.agreement,
        subjectivity:data.subjectivity,
        confidence:data.confidence,
        irony:data.irony
       }
    console.log(projectData)
    res.send(projectData)
    }catch(error){
        console.log(error)
    }
})
