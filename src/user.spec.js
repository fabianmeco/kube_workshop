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
});