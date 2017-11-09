const fixtures = require("./user.fixtures");

describe('user', function(){
    describe('[POST] /user', function(){
        it('it should create a new user', function(done){
            chai.request(app).post('/user').send(fixtures.post.user).end(function(err, res){
                should.not.exist(err);
                res.body.should.be.a('object');
                res.body.userId.should.be.a('string');
                done();
            })
        })
    });
    describe('[GET] /user', function(){
        it('it should get all the users', function(done){
            chai.request(app).get('/user').end(function(err, res){
                should.not.exist(err);
                res.body.should.be.a('array');
                res.body.should.have.lengthOf(1); 
                done();               
            });
        })
    });
    describe('[GET] /user/:userId', function(){
        it('it should get an user with userId', function(done){
            chai.request(app).get('/user/1').end(function(err, res){
                should.not.exist(err);
                res.body.should.be.an('object');                
                done();
            })
        });
    })
    describe('[DELETE] /user/:userId', function(){
        it('it should delete an user using his userId', function(done){
            chai.request(app).get('/user/1').end(function(err, res){
                should.not.exist(err);
                res.body.should.be.an('object');
                res.body.should.not.be.an('array');
                done();
            })
        })                 
        
    
    })
    describe('[PUT] /user/:userId', function(){
        it('it should update an user using his userId', function(done){
            chai.request(app).get('/user/1').send(fixtures.post.user).end(function(err, res){
                should.not.exist(err);
                res.body.userId.should.to.equal('1');
                res.body.username.should.be.an('string');
                res.body.username.should.have.lengthOf(3);
                done();
            })
        })
    })
});