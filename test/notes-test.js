// 'use strict'

// require('dotenv').config();
// const mongoose = require('mongoose');

// const mocha = require('mocha');
// const chai = require('chai');
// const chaiHttp = require('chai-http');

// const faker = require('faker')

// const {TEST_DATABASE_URL} = require('../config.js');

// const {app, runServer, closeServer} = require("../server.js");
// const {Note, User} = require('../models.js');
// const expect = chai.expect;

// chai.use(chaiHttp);

// function seedNotesData(){
//     console.info('seeding note data'); 
//     const seedData = []; 

//     for(let i=1; i <= 10; i++){
//         seedData.push(generateNotesData());
//     }
//     return Note.insertMany(seedData);
// }

// function generateNotesData(data){
//     return {
//         topic: faker.lorem.word(),
//         user: data._id, 
//         passage: {
//             book: faker.lorem.word(),
//             chapter: faker.random.number(),
//             verse: faker.random.number()
//         },
//         reflection: faker.lorem.words(),
//     }
// }

// function seedUserData(){
//     console.info('seeding user data');
//     return User
//     .create(generateUserData())
//     .then(user => {
//         let userNote = generateNotesData(user); 
//         return Note
//         .create(userNote)
//     })
//     .catch(err => {
//         console.error(err); 
//         throw(err);
//      })
// }

// function generateUserData(){
//     return {
//         firstName: faker.name.firstName(),
//         lastName: faker.name.lastName(), 
//         userName: faker.internet.userName(),
//         email: faker.internet.email(),
//         password: faker.internet.password()
//     }
// }
// function teardownDb(){
//     console.warn('Deleting database');
//     return mongoose.connection.dropDatabase();
// }

// describe('Bible Notes API for Notes', function() {
    
//     before(function(){ 
//         runServer(TEST_DATABASE_URL); 
//     })

//     beforeEach(function(){
//          seedUserData(); 
//     })

//     after(function(){
//         closeServer(); 
//     })

//     after(function(){
//         teardownDb(); 

//     })
 
//    xdescribe ('GET endpoint', function(){
        
//         it('should get all notes', function(){
//             let res;
//             return chai.request(app)
//                 .get('/notes')
//                 .then(function (_res){
//                     res = _res; 
//                     expect(res).to.have.status(200); 
//                     expect(res.body).to.have.length.of.at.least(1); 
//                     return Note.find().count(); 
//                 })
//                 .then(function (count) {
//                     expect(res.body).to.have.lengthOf(count)
//                 })
//         }) 
//     });

//         it('should return note with correct fields', function () {
//             let resNotes; 
//             return chai.request(app)
//                 .get('/notes')
//                 .then(function (res) {
//                     expect(res).to.have.status(200); 
//                     expect(res).to.be.json; 
//                     expect(res.body).to.be.a('array'); 
//                     expect(res.body).to.have.lengthOf.at.least(1); 

//                     res.body.forEach(function(note){
//                         expect(note).to.be.a('object');
//                         expect(note).to.include.keys(
//                             'id', 'topic', 'passage', 'reflection'
//                         );
//                     })
//                     resNotes = res.body[0]; 
//                     return Note.findById(resNotes.id); 
//                 })
//                 .then(function (note) {
//                     expect(note.id).to.equal(resNotes.id); 
//                     expect(note.topic).to.equal(resNotes.topic); 
//                     expect(note.passage.book).to.equal(resNotes.passage.book); 
//                     expect(note.passage.chapter).to.equal(resNotes.passage.chapter);
//                     expect(note.passage.verse).to.equal(resNotes.passage.verse);
//                     expect(note.reflection).to.equal(resNotes.reflection);
//                 })
//         })
// })
