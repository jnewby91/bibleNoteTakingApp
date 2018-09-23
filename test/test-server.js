'use strict'

const mocha = require('mocha'); 
const chai = require('chai');
const chaiHttp =require('chai-http');

const {app} = require("../server");

const expect = chai.expect; 

chai.use(chaiHttp);

describe("Bible Notes", function(){
    it("should give a 200 response ", function() {
        return chai.request(app).get('/').then(function (res) {
            expect(res).to.have.status(200);
        })
    })
})


