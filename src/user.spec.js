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
                expect(res).to.have.status(422);
            })
        });
        it('it shouldn\'t create a new user with wrong attributes',function(){
            chai.request(app).post('/user').send(fixtures.post.userbad).end(function(err, res){
                should.exist(err);
                expect(res).to.have.status(422);
            })
        });
        it('it shouldn\'t create a new user without required attributes',function(){
            chai.request(app).post('/user').send(fixtures.post.usernotcomplete).end(function(err, res){
                should.exist(err);
                expect(res).to.have.status(422);
            })
        });
        it('it should create a new user without unrequired attributes',function(){
            chai.request(app).post('/user').send(fixtures.post.usernophone).end(function(err, res){
                should.exist(err);
                expect(res).to.have.status(422);
            })
        });
    });
    describe('[GET] /user', function(){
        it('it should get all the users', function(done){
            chai.request(app).get('/user').end(function(err, res){
                should.not.exist(err);
                res.body.should.be.a('array');
                res.body.should.have.lengthOf(3); 
                done();               
            });
        });
        it('it should\'t get users with wrong format query', function(done){
            chai.request(app).get('/user?gender=T').end(function(err, res){
                should.exist(err);
                expect(err).to.have.status(422);
                done();               
            });
        }); 
        it('it should\'t get users that are not saved', function(done){
            chai.request(app).get('/user?username=haroldfinch').end(function(err, res){
                should.exist(err);
                expect(err).to.have.status(404);
                done();
            })
        });
        it('it should get users that match with the query', function(done){
            chai.request(app).get('/user?username=Fabian').end(function(err, res){
                should.not.exist(err);
                done();
            })
        });       
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
        it('it should update an user using his userId and the same username', function(done){
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
        it('it shouldn\'t update an user using wrong formated attibutes', function(done){
            chai.request(app).put('/user/2').send(fixtures.put.userwrong).end(function(err, res){
                should.exist(err);
                expect(res).have.status(422);
                done();
            })
        });
        it('it shouldn\'t put an user using an invalid userId', function(done){
            chai.request(app).put('/user/6').send(fixtures.put.user).end(function(err, res){
                should.exist(err);
                expect(res).to.have.status(404);
                done();
            })
        });
        it('it should update an user using unexpected attributes', function(done){
            chai.request(app).put('/user/1').send(fixtures.put.usert).end(function(err, res){
                should.not.exist(err);
                res.body.id.should.to.equal('1');
                res.body.username.should.be.an('string');
                res.body.username.should.have.lengthOf(fixtures.put.user.username.length);
                done();
            })
        });
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