var express = require('express');
var route = express.Router();
var arr = [];

route.use(function timeLog (req, res, next) {
    console.log('Time: ', Date.now())
    next()
  })

route.post('/:userId/:username', function(req, res){
    var user = {"userId":req.params.userId, "username":req.params.username};
    arr.push(user);
    res.send('new user: '+arr[arr.length-1].userId+" with name: "+arr[arr.length-1].username)
});


route.get('/', function(req, res){
    var msg = "";
    arr.forEach(function(value){
        msg += value.userId +", "+ value.username + " - ";
    });
    res.send("Users:" + msg)
});

route.get('/:userId', function(req, res){
    var msg = "";
    arr.forEach(function(value){
        if(value.userId===req.params.userId){
            msg+= value.userId +", "+ value.username + " - ";
        }
    });
    res.send("user: "+msg)
});

route.delete('/:userId', function(req, res){
    arr.forEach(function(value){
        if(value.userId===req.params.userId){
            arr.splice(value.indexOf(),1);
        }        
    });
    res.send('you killed this user '+req.params.userId+' :(')
});
route.put('/:userId/:newname', function(req, res){
    arr.forEach(function(value){
        if(value.userId===req.params.userId){
            value.username = req.params.newname;
        }       
    });
    res.send('the user '+req.params.userId+' has been updated (cyborg voice)')
});

module.exports = route