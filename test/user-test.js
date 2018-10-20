'use strict'

require('dotenv').config();
const mongoose = require('mongoose');

const mocha = require('mocha');
const chai = require('chai');
const chaiHttp = require('chai-http');

const faker = require('faker')

const {TEST_DATABASE_URL} = require('../config.js');

const {app, runServer, closeServer} = require("../server.js");
const {User} = require('../models.js');
const expect = chai.expect;

chai.use(chaiHttp);

// describe("Bible Notes", function(){
//     it("should give a 200 response ", function() {
//         return chai.request(app).get('/').then(function (res) {
//             expect(res).to.have.status(200);
//         })
//     })
// })

function seedUserData(){
    console.info('seeding user data'); 
    const seedData = []; 

    for(let i=1; i <= 10; i++){
        seedData.push(generateUserData());
    }
    return User.insertMany(seedData);
}

function generateUserData(){
    return {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(), 
        userName: faker.internet.userName(),
        email: faker.internet.email(),
        password: faker.internet.password()
    }
}

function teardownDb(){
    console.warn('Deleting database');
    return mongoose.connection.dropDatabase();
}

describe('BibleNotes API for Users', function () { 
   
    before(function(){
    
        return runServer(TEST_DATABASE_URL); 
    });
    
    beforeEach(function () {

        return seedUserData();
    });

    afterEach(function(){
        return teardownDb();
    });

    after(function() {
        return closeServer(TEST_DATABASE_URL);
    });
    

    describe('GET endpoint', function () {
        
        it("should return all users ", function () {
            let res;
            return chai.request(app)
                .get('/users')
                .then(function (_res) {
                    res = _res;
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.length.of.at.least(1);
                    return User.count();
                })
                .then(function (count) {
                    expect(res.body).to.have.lengthOf(count)
                })
        })
    });

        it('should return users with correct fields', function (){
            let resUser;
            return chai.request(app)
                .get('/users')
                .then(function (res) {
                    expect(res).to.have.status(200);
                    expect(res).to.be.json;
                    expect(res.body).to.be.a('array'); 
                    expect(res.body).to.have.lengthOf.at.least(1);

                    res.body.forEach(function(user) {
                        expect(user).to.be.a('object'); 
                        expect(user).to.include.keys(
                            'id', 'username'
                        );
                    });
                    resUser = res.body[0];
                    return User.findById(resUser.id);
                    })
                .then(function (user) {
                    // console.log('this is user:', user);
                    expect(user.id).to.equal(resUser.id);
                    expect(user.userName).to.equal(resUser.username);
                    expect(`${user.firstName} ${user.lastName}`).to.equal(resUser.name);
                })

        })
    describe('POST endpoint', function(){
        
        it('should add User ', function(){

            const newUser = generateUserData(); 

            return chai.request(app)
                .post('/users')
                .send(newUser)
                .then( function (res){
                    expect(res).to.have.status(201); 
                    expect(res).to.be.json;
                    expect(res.body).to.be.a('object'); 
                    expect(res.body).to.include.keys('userName', 'email'); 
                    expect(res.body.id).to.not.be.null;
                    return User.findById(res.body.id)
                })

                .then(function (user) {
                    expect(user.userName).to.equal(newUser.userName); 
                    expect(user.email).to.equal(newUser.email); 
                })
        })
    })

    describe('PUT endpoint', function () {
        it('should update User information', function (){
            const updateData = {
                email: 'sallymaine@mailinator.com',
                userName: 'smaine20',
                // password: 'constant'
            };

            return User
            .findOne()
            .then(function (user) {
                updateData.id = user.id; 
                console.log(updateData.id);

                return chai.request(app)
                    .put(`/users/${user.id}`)
                    .send(updateData);
            })
            .then(function (res) {
                expect(res).to.have.status(200); 

                return User.findById(updateData.id); 

            })
            .then(function (user) {
                expect(user.email).to.equal(updateData.email);
                expect(user.userName).to.equal(updateData.userName); 
                // expect(user.password).to.equal(updateData.password);
            })
        })
    })

})

