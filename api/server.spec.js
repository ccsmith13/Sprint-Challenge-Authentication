const request = require('supertest');
const server = require('./server.js');
const db = require('../database/dbConfig.js');

describe('server',()=> {
    it('should set the testing environment', ()=>{
        expect(process.env.DB_ENV).toBe('testing');
    });
    //two tests for register endpoint
    describe('POST /register', () =>{
        it('responds with json status 201 and returns a json object on successful register', function(done) {
            request(server)
                .post('/api/auth/register')
                .send({username:"test", password:"testing123456"})
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(201)
                .end(function(err, res) {
                    if (err) return done(err);
                    done();
                });
                
        });
        beforeEach(async ()=>{
            await db('users').truncate();
        });

        it('responds with json status 500 on unsuccessful register', function(done) {
            request(server)
                .post('/api/auth/register')
                .send({username:null, password:null})
                .set('Accept', 'application/json')
                .expect(500)
                .end(function(err, res) {
                    if (err) return done(err);
                    done();
                });
        });
         

    });
    // two tests for login endpoint
    describe('POST /login', () =>{
        it('responds with json status 200 and returns a json object on successful register', function(done) {
            request(server)
                .post('/api/auth/register')
                .send({username:"test", password:"newpassword"})
                .set('Accept', 'application/json')
                .end(function(err, res) {
                    if (err) return done(err);
                    done();
                });
            request(server)
                .post('/api/auth/login')
                .send({username:"test", password:"newpassword"})
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function(err, res) {
                    if (err) return done(err);
                    done();
                });
        });
        it('responds with json status 401 on incorrect login of existing user', function(done) {
            request(server)
                .post('/api/auth/login')
                .send({username:"test", password:"wrongpassword"})
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(401)
                .end(function(err, res) {
                    if (err) return done(err);
                    done();
                });
        });
    });

    describe('GET /jokes', () =>{
        it('responds with json status 401 if you aren not logged in', function(done) {
            request(server)
                .get('/api/jokes')
                .expect(401)
                .expect('Content-Type', /json/)
                .end(function(err, res) {
                    if (err) return done(err);
                    done();
            });
        });
        it('responds with json object to be returned from the GET function', function(done) {
            request(server)
                .get('/api/jokes')
                .expect('Content-Type', /json/)
                .end(function(err, res) {
                    if (err) return done(err);
                    done();
            });
        });
    });
    
    beforeEach(async ()=>{
        await db('users').truncate();
    }); 
});


//to be fixed later 

/* request(server)
.post('/api/auth/register')
.send({username:"carolebaskin", password:"coolkitten"})
.set('Accept', 'application/json')
.end(function(err, res) {
    if (err) return (err)
});
request(server)
.post('/api/auth/login')
.send({username:"carolebaskin", password:"coolkitten"})
.set('Accept', 'application/json')
.end(function(err, res) {
    if (err) return(err);
});
it('responds with json status 200 and returns a json object on successful GET request', function(done) {
request(server)
.get('/api/jokes')
.set('Accept', 'application/json')
.expect('Content-Type', /json/)
.expect(200)
.end(function(err, res) {
    if (err) return done(err);
    done();
}); 
}); */