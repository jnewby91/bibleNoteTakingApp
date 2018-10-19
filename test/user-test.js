'use strict'
const mongoose = require('mongoose');
const mocha = require('mocha');
const chai = require('chai');
const chaiHttp = require('chai-http');

const faker = require('faker')

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

describe('BibleNotes API for Users', function () { 
   
    before(function (){
    
        return runServer(); 
    });






    describe('GET endpoint', function () {
    
        
        it("should return all users ", function () {
            let res;
            return chai.request(app)
                .get('/users')
                .then(function (_res) {
                    res = _res;
                    expect(res).to.have.status(200);
                    expect(res.body.notes).to.have.length.of.at.least(1);
                    return User.count();
                })
                .then(function (count) {
                    expect(res.body).to.have.length.of(count)
                })
        })
    });

})

