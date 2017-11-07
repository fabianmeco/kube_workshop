var express = require('express');
var route = express.Router();

route.use(function timeLog (req, res, next) {
    console.log('Time: ', Date.now())
    next()
  })

route.post('/', function(req, res){
    res.send('new user'+req.body.name)
});


route.get('/', function(req, res){
    res.send("all users")
});

route.get('/:userId', function(req, res){
    res.send("user: "+req.params.userId)
});

route.delete('/:userId', function(req, res){
    res.send('you killed this user '+req.params.userId+' :(')
});
route.put('/:userId', function(req, res){
    res.send('the user '+req.params.userId+' has been updated (cyborg voice)')
});

module.exports = route