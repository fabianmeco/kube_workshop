"use strict"

const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');
const schema = require('node-schema-object');
const regex = require('node-regexp');
const route = express.Router();
const arr = [];

const User = new schema({
    id: { type: String, required: true },
    username: { type: String, required: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    phone: { type: String, maxLenght: 10, regex: /^[0-9\-\+]{10}$/ },
    email: { type: String, required: true, regex: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ },
    gender: { type: String, enum: ['M', 'F'] }
}, { setUndefined: true });

const Usersearch = new schema({
    username: { type: String},
    first_name: { type: String},
    last_name: { type: String},
    phone: { type: String, maxLenght: 10, regex: /^[0-9\-\+]{10}$/ },
    email: { type: String, regex: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ },
    gender: { type: String, enum: ['M', 'F'] }    
}, { setUndefined: false })

route.use(function timeLog(req, res, next) {
    //console.log('Time: ', Date.now())
    next()
})


route.post('/', function (req, res) {
    if (_.find(arr, { "username": req.body.username })) {
        res.status(422).json({ "errorMessage": "Username already used." })
    } else {
        let user = new User({
            "id": (arr.length + 1) + '',
            "username": req.body.username,
            "first_name": req.body.first_name,
            "last_name": req.body.last_name,
            "phone": req.body.phone,
            "email": req.body.email,
            "gender": req.body.gender
        });

        if (user.isErrors()) {
            res.status(422).json(user.getErrors().map(function (err) {
                return { "message": err.errorMessage, "name": err.fieldSchema.name };
            }));

        } else {
            arr.push(user);
            res.json(arr[arr.length - 1]);
        }

    }
});


route.get('/', function (req, res) {
    if(_.isEmpty(req.query)){        
        return res.json(arr);
    }    
    let user = new Usersearch(req.query); 
    
    if(user.isErrors()){
        return res.status(422).json(user.getErrors().map(function () {
            return { "message": err.errorMessage, "name": err.fieldSchema.name };
        }));
    }    
    return res.json(_.filter(arr, user));
});

route.get('/:id', function (req, res) {
    let tmp = _.find(arr, { "id": req.params.id });
    if (tmp) {
        return res.json(tmp);
    }
    res.sendStatus(404);
});

route.delete('/:id', function (req, res) {
    let removed = _.remove(arr, function (user) {
        return user.id === req.params.id;
    })
    if (removed.length > 0) {
        return res.json(removed[0]);
    }
    res.sendStatus(404);

});
route.put('/:id', function (req, res) {
    let usert = _.find(arr, { "id": req.params.id });
    if (!usert) {
        return res.sendStatus(404);
    }
    let usertname = _.find(arr, { "username": req.body.username });
    if (usertname && usertname.id !== usert.id) {
        return res.status(422).json({ "errorMessage": "Username already used." });
    }
    let userx = usert.clone();
    _.assign(userx, req.body)
    if (userx.isErrors()) {
        res.status(422).json(userx.getErrors().map(function (err) {
            return { "message": err.errorMessage, "name": err.fieldSchema.name };
        }));
    } else {
        _.assign(usert, req.body);
        return res.json(usert);
    }

});

module.exports = route
