var express = require('express');
var request = require('request');
var app = express();

require('dotenv').config()

var port = process.env.PORT || 2000;

app.get('/', function(req,res) {
    console.log('get root route');
    request('http://www.google.com', function(error, response, body){
        if(!error && response.statusCode == 200) {
            res.send(process.env.OMDB);
        }
    });
});

app.get('/movie', function(req,res) {
    var qs = {
        s: 'star wars'
    };
    request({
        url: 'http://www.omdbapi.com/?apikey=' + process.env.OMDB + '&',
        qs: qs
    }, function(error,response,body) {
        if (!error && response.statusCode == 200) {
            var dataObj = JSON.parse(body);
            console.log(dataObj);
            res.send(dataObj);
        } else {
            console.log(error);
            console.log('response: ', response.statusCode);
            // console.log(b);
        }
    })
})

app.listen(port, function(){
    console.log('server running on port: ' + port);
})