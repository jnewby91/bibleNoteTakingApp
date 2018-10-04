'use strict'
const faker = require('faker')
const mongoose = require('mongoose');
const mocha = require('mocha');
const chai = require('chai');
const chaiHttp = require('chai-http');

const {app, runServer, closeServer} = require("../server");

const expect = chai.expect;

chai.use(chaiHttp);

// describe("Bible Notes", function(){
//     it("should give a 200 response ", function() {
//         return chai.request(app).get('/').then(function (res) {
//             expect(res).to.have.status(200);
//         })
//     })
// })
describe('Bible Notes', function () {
    
    it("should return all notes ", function () {
        let res;
        return chai.request(app)
            .get('/users')
            .then(function (_res) {
                res = _res;
                expect(res).to.have.status(200);
                expect(res.body.notes).to.have.length.of.at.least(1);
                return Note.count();
            })
            .then(function (count) {
                expect.length(res.body.notes).to.have.length.of(count)
            })
    })
});