process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let Db = require('../models/index');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
let should = chai.should();
chai.use(chaiHttp);

describe('Test Devs Contact and Categories', () => {
let catId;
let DevContact;
    before((done) => { 
        Db.Devs.remove({}, (err) => { 
            Db.DevCat.remove({}, (err) => { 
                done();           
             });          
        });    
               
    });

describe('/GET empty Devs Contact', () => {
    it('it should GET all Devs contact', (done) => {
      chai.request(server)
          .get('/contact')
          .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(0);
            done();
          });
    });
});

describe('/POST new Developer Category', () => {
    it('it should POST a new Developer Category' , (done) => {
        let DevCat = {
            name: "Front End"
        }
      chai.request(server)
          .post('/category')
          .send(DevCat)
          .end((err, res) => {
            catId = res.body.data.data._id
                res.should.have.status(200);
            done();
          });
    });

});

describe('/POST, Get, Update, Delete Developer Contact', () => {
    it('it should POST a new Developer', (done) => {
        let Dev = {
            "firstname": "James",
            "lastname": "King",
            "email": "jamesking@gmail.com",
            "phone": "08062239670",
            "category": catId
        }
      chai.request(server)
          .post('/contact')
          .send(Dev)
          .end((err, res) => {
            DevContact = res.body.data
                res.should.have.status(200);
                res.body.data.should.be.a('object');
            done();
          });
    });

    it('it should GET all Devs contact', (done) => {
        chai.request(server)
            .get('/contact')
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('array');
                  res.body.length.should.be.eql(1);
              done();
            });
      });

      it('it should Update a Devs\' contact', (done) => {
        chai.request(server)
            .put('/contact')
            .send(DevContact)
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
              done();
            });
      });

      it('it should Delete a Devs\' contact', (done) => {
        chai.request(server)
            .delete('/contact')
            .send(DevContact)
            .end((err, res) => {
                console.log(res.body)
                  res.should.have.status(200);
                  res.body.should.be.a('object');
              done();
            });
      });

});


});