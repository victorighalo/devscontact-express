process.env.NODE_ENV = 'TEST';
let mongoose = require("mongoose");
let Db = require('../models/index');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
let should = chai.should();
chai.use(chaiHttp);

describe('Test Suite - Devs Contact and Categories', () => {
let catId;
let DevContact;

//Reset the DB before starting tests
    before((done) => { 
        Db.Devs.remove({}, (err) => { 
            Db.DevCat.remove({}, (err) => { 
                Db.User.remove({}, (err) => { 
                    done()
                 });             
             });          
        });          
    });

describe('Test Devs Contact and Categories endpoints after Deleting all records the from database', () => {

    it('it should return empty array of Devs contact', (done) => {
      chai.request(server)
          .get('/contact')
          .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(0);
            done();
          });
    });

    it('it should return empty array of Devs Category', (done) => {
        chai.request(server)
            .get('/category')
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('array');
                  res.body.length.should.be.eql(0);
              done();
            });
      });
});

describe('TEST Category End Points without Auth Token', () => {

    it('it should fail to POST a new Category' , (done) => {
        let DevCat = {
            name: "Front End"
        }
      chai.request(server)
          .post('/category')
          .send(DevCat)
          .end((err, res) => {
                res.should.have.status(401);
            done();
          });
    });

    it('it should fail to Update a Category' , (done) => {
        let DevCat = {
            id: 'hsfwadoiwabwadaj9342342',
            name: "Front End"
        }
      chai.request(server)
          .put('/category')
          .send(DevCat)
          .end((err, res) => {
                res.should.have.status(401);
            done();
          });
    });

    it('it should fail to Access a single Category' , (done) => {
      chai.request(server)
          .get('/category/774626njdsfen34')
          .end((err, res) => {
                res.should.have.status(401);
            done();
          });
    });

    it('it should fail to Delete a Category' , (done) => {
        let Data = {
            id: 'jkndsr34343sdfwekn'
        }
        chai.request(server)
            .delete('/category')
            .send(Data)
            .end((err, res) => {
                  res.should.have.status(401);
              done();
            });
      });


      //Contact Routes
    it('it should fail to POST a new Developer Contact' , (done) => {
        let Data = {
            "firstname": "Bright",
            "lastname": "John",
            "email": "brightjohn@gmail.com",
            "phone": 8077366233,
            "category": "5c0fbeadf7d2f0361df73508"
        }
      chai.request(server)
          .post('/contact')
          .send(Data)
          .end((err, res) => {
                res.should.have.status(401);
            done();
          });
    });

    it('it should fail to Update a Developer Contact' , (done) => {
        let Data = {
            "id": 'ujbwiwqqwee',
            "firstname": "Bright",
            "lastname": "John",
            "email": "brightjohn@gmail.com",
            "phone": 8077366233,
            "category": "5c0fbeadf7d2f0361df73508"
        }
      chai.request(server)
          .post('/contact')
          .send(Data)
          .end((err, res) => {
                res.should.have.status(401);
            done();
          });
    });

    it('it should fail to Access a single Developer Contact' , (done) => {
      chai.request(server)
          .get('/contact/923238wwewqeqw')
          .end((err, res) => {
                res.should.have.status(401);
            done();
          });
    });

    it('it should fail to delete a Developer Contact' , (done) => {
        let Data = {
            id: 'jkndsr34343sdfwekn'
        }
        chai.request(server)
            .delete('/contact')
            .send(Data)
            .end((err, res) => {
                  res.should.have.status(401);
              done();
            });
      });
    });

      describe('Authentications Tests', () => {
          it('It should fail to Register a new User with wrong parameters sent', (done)=>{
              let Data = {
                firstnam: 'Victor',
                lastname: 'Ighalo',
                email: 'victorighalo@gmail.com',
                password: 'testpassword@1_2'

              }
              chai.request(server)
                .post('/auth/register')
                .send(Data)
                .end( (err, res) => {
                    res.should.have.status(500);
                    done();
                })
          });

          it('It should fail to Login with unregistered user details', (done)=>{
            let Data = {
              email: 'victorighalo@gmail.com',
              password: 'testpassword@1_2'

            }
            chai.request(server)
              .post('/auth/login')
              .send(Data)
              .end( (err, res) => {
                  res.should.have.status(400);
                  done();
              })
        });
    });
    describe('POST, Get, Update, Delete Developer Contact', () => {

        it('It should Register a new User successfully', (done)=>{
            let Data = {
              firstname: 'Victor',
              lastname: 'Ighalo',
              email: 'victorighalo@gmail.com',
              password: 'testpassword@1_2'

            }
            try{
            chai.request(server)
              .post('/auth/register')
              .send(Data)
              .end( (err, res) => {
                DevContact = res.body
                  res.should.have.status(201);
                  done();
              })
            }catch (e) {
                done(e);
            }
        });
        it('It Authenticates a User successfully', (done)=>{
            try{
            chai.request(server)
              .post('/auth/login')
              .send({"email": DevContact.data.email, "password":"testpassword@1_2"})
              .end( (err, res) => {
                  res.should.have.status(200);
                  done();
              })
            }catch (e) {
                done(e);
            }
        });
        it('it should GET all Users', (done) => {
            chai.request(server)
                .get('/auth/users')
                .end((err, res) => {
                      res.should.have.status(200);
                      res.body.should.be.a('array');
                      res.body.length.should.be.eql(1);
                  done();
                });
          });

      })
});