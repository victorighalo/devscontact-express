process.env.NODE_ENV = 'TEST';

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

describe('Test Devs Contact and Categories after Deleting all records the from database', () => {
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

describe('TEST Developer Category End Points without Auth Token', () => {

    it('it should fail to POST a new Developer Category' , (done) => {
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

    it('it should fail to Update a Developer Category' , (done) => {
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

    it('it should fail to Access a single Developer Category' , (done) => {
      chai.request(server)
          .get('/category/774626njdsfen34')
          .end((err, res) => {
                res.should.have.status(401);
            done();
          });
    });

    it('it should fail to Delete a Developer Category' , (done) => {
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



// describe('/POST, Get, Update, Delete Developer Contact', () => {
//     it('it should POST a new Developer', (done) => {
//         let Dev = {
//             "firstname": "James",
//             "lastname": "King",
//             "email": "jamesking@gmail.com",
//             "phone": "08062239670",
//             "category": catId
//         }
//       chai.request(server)
//           .post('/contact')
//           .send(Dev)
//           .end((err, res) => {
//             DevContact = res.body.data
//                 res.should.have.status(200);
//                 res.body.data.should.be.a('object');
//             done();
//           });
//     });

//     it('it should GET all Devs contact', (done) => {
//         chai.request(server)
//             .get('/contact')
//             .end((err, res) => {
//                   res.should.have.status(200);
//                   res.body.should.be.a('array');
//                   res.body.length.should.be.eql(1);
//               done();
//             });
//       });

//       it('it should Update a Devs\' contact', (done) => {
//         chai.request(server)
//             .put('/contact')
//             .send(DevContact)
//             .end((err, res) => {
//                   res.should.have.status(200);
//                   res.body.should.be.a('object');
//               done();
//             });
//       });

//       it('it should Delete a Devs\' contact', (done) => {
//         chai.request(server)
//             .delete('/contact')
//             .send(DevContact)
//             .end((err, res) => {
//                 console.log(res.body)
//                   res.should.have.status(200);
//                   res.body.should.be.a('object');
//               done();
//             });
//       });

// });


});