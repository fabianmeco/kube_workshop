"use strict"

const express = require('express');
const bodyParser = require('body-parser');
const route = express.Router();
const arr = [];

route.use(function timeLog (req, res, next) {
    //console.log('Time: ', Date.now())
    next()
  })

route.post('/', function(req, res){
    let user = {"userId":(arr.length+1)+'', "username":req.body.username};
    arr.push(user);
    res.json(arr[arr.length-1]);
});


route.get('/', function(req, res){
    res.json(arr);
});

route.get('/:userId', function(req, res){    
    let tmp = arr.find(function(user){
        return (user.userId===req.params.userId)
    });
    if(tmp){
        return res.json(tmp);  
    }
    res.sendStatus(404);
});

route.delete('/:userId', function(req, res){
    for(let i = 0;i<arr.length;i++){
        if(arr[i].userId===req.params.userId){

            let tmp = arr.splice(i,1);
            return res.json(tmp[0]);
        }
    }
    res.sendStatus(404);
});
route.put('/:userId', function(req, res){
    for(let i = 0;i<arr.length;i++){
        if(arr[i].userId===req.params.userId){
            arr[i].username = req.body.newname;
            return res.json(arr[i]);
        }
    }
    res.sendStatus(404);    
});

module.exports = route