var express = require('express');
var bodyParser = require('body-parser');
var users = require('./user');
var app = express();


app.listen(3000, function(){
    console.log('example app listening on 3000');
});

app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use('/user', users);