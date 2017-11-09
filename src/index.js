const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');
const users = require('./user');
const app = express();


app.listen(3000, function(){
    console.log('example app listening on 3000');
});

app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use('/user', users);

module.exports = app 