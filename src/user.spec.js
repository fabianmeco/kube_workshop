const fixtures = require("./user.fixtures");

describe('user', function(){
    describe('[POST] /user', function(){
        it('it should create a new user', function(done){
            chai.request(app).post('/user').send(fixtures.post.user).end(function(err, res){
                should.not.exist(err);
                res.body.should.be.a('object');
                //res.body.userId.should.be.a('string');
                done();
            })
        });
        it('it shouldn\' create a new user with duplicated username',function(){
            chai.request(app).post('/user').send(fixtures.post.usert).end(function(err, res){
                should.exist(err);
                expect(res).to.have.status(409);
            })
        });
    });
    describe('[GET] /user', function(){
        it('it should get all the users', function(done){
            chai.request(app).get('/user').end(function(err, res){
                should.not.exist(err);
                res.body.should.be.a('array');
                res.body.should.have.lengthOf(2); 
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
        it('it shouldn\'t get an user using an invalid userId', function(done){
            chai.request(app).get('/user/5').end(function(err, res){
                should.exist(err);
                expect(res).to.have.status(404);
                done();
            })
        })
    });
    describe('[PUT] /user/:id', function(){
        it('it should update an user using his userId', function(done){
            chai.request(app).put('/user/1').send(fixtures.put.user).end(function(err, res){
                should.not.exist(err);
                res.body.id.should.to.equal('1');
                res.body.username.should.be.an('string');
                res.body.username.should.have.lengthOf(fixtures.put.user.username.length);
                done();
            })
        });
        it('it shouldn\'t update an user using a duplicated username', function(done){
            chai.request(app).put('/user/2').send(fixtures.put.user).end(function(err, res){
                should.exist(err);
                expect(res).have.status(422);
                done();
            })
        });
        it('it shouldn\'t put an user using an invalid userId', function(done){
            chai.request(app).put('/user/5').send(fixtures.put.user).end(function(err, res){
                should.exist(err);
                expect(res).to.have.status(404);
                done();
            })
        })
    });
    describe('[DELETE] /user/:id', function(){
        it('it should delete an user using his userId', function(done){
            chai.request(app).delete('/user/1').end(function(err, res){
                should.not.exist(err);
                res.body.should.be.an('object');
                res.body.should.not.be.an('array');
                done();
            })
        });
        
        it('it shouldn\'t delete an user using an invalid userId', function(done){
            chai.request(app).delete('/user/5').end(function(err, res){
                should.exist(err);
                expect(res).to.have.status(404);
                done();
            })
        });
    });
});