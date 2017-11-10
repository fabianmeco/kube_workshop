"use strict"

const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');
const schema = require('node-schema-object');
const regex = require('node-regexp');
const route = express.Router();
const arr = [];

const User = new schema({
    id: {type: String, required:true},
    username :{type: String, required:true},
    first_name: {type: String, required:true},
    last_name :{type: String, required:true},
    phone : {type:String, maxLenght:10, regex:/^[0-9\-\+]{10}$/},
    email : {type:String,required:true, regex: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/},
    gender: {type:String, enum:['M','F']}
},{setUndefined: true});


route.use(function timeLog (req, res, next) {
    //console.log('Time: ', Date.now())
    next()
  })

route.post('/', function(req, res){    
        let user = new User({"id":(arr.length+1)+'', 
                "username":req.body.username, 
                "first_name":req.body.first_name,
                "last_name": req.body.last_name,
                "phone":req.body.phone,
                "email":req.body.email,
                "gender" : req.body.gender});
        
        if(user.isErrors()){
            res.status(422).json(user.getErrors().map(function(){
                return {"message" : user.getErrors()[0].errorMessage, "name": user.getErrors()[0].fieldSchema.name};
            }));
            
        }else{

            arr.push(user);
            res.json(arr[arr.length-1]);
        }
});


route.get('/', function(req, res){
    res.json(arr);
});

route.get('/:userId', function(req, res){    
    let tmp = _.find(arr, {"id": req.params.userId});    
    if(tmp){
        return res.json(tmp);  
    }
    res.sendStatus(404);
});

route.delete('/:userId', function(req, res){
    let removed = _.remove(arr, function (user) {
        return user.id===req.params.userId;
      })
      if(removed.length>0){
        return res.json(removed[0]);
      }
      res.sendStatus(404);
    
});
route.put('/:userId', function(req, res){
    let tmp = _.findIndex(arr, {"id": req.params.userId}); 
    let usert = new User(req.body);
    if(tmp>-1){
        _.assignIn(arr[tmp],usert);
        return res.json(arr[tmp]);
    }
    res.sendStatus(404);    
});

module.exports = route