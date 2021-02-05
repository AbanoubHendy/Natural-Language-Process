const dotenv = require('dotenv');
dotenv.config();
var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')
const apiKey = process.env.API_KEY;
var https = require('follow-redirects').https;
var fs = require('fs');
console.log(`Your API key is ${process.env.API_KEY}`);


const app = express()

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
    res.send(mockAPIResponse)
})

var options = {
    'method': 'POST',
    'hostname': 'api.meaningcloud.com',
    'path': '/sentiment-2.1?key=186c9dd70631cf3585378167bad6b588&lang=<lang>&txt=<text>&model=<model>',
    'headers': {
    },
    'maxRedirects': 20
};
var req = https.request(options, function (res) {
    var chunks = [];
    res.on("data", function (chunk) {
      chunks.push(chunk);
    });
    res.on("end", function (chunk) {
        var body = Buffer.concat(chunks);
        console.log(body.toString());
    });
    res.on("error", function (error) {
        console.error(error);
    });
});
req.end();


