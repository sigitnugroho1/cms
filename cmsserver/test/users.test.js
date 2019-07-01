'use strict'

const chai = require('chai');
const chaiHTTP = require('chai-http');          // request testnya
const server = require('../app');
const User = require('../models/user');


const should = chai.should();               // pengecekan
chai.use(chaiHTTP);



describe('user', function () {
    User.collection.drop();

    beforeEach(function (done) {
        let user = new User({
            email: "zoro@gmail.com",
            password: "12345"
        })
        user.save(function (err) {
            done();
        })
    })

    afterEach(function (done) {
        User.collection.drop();
        done();
    })



    it("Seharusnya menyimpan data dan menampilkan email dan kode token dengan metode POST", function (done) {
        chai.request(server)
            .post('/api/users/register')
            .send({
                email: "zoro@gmail.com",
                password: "1234567",
                retypepassword: "1234567"
            }).end(function (err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('data');
                res.body.should.have.property('token');
                res.body.data.email.should.equal("zoro@gmail.com");
                res.body.token.should.equal(res.body.token);
                done();
            })
    })



    it("Seharusnya sistem mengecek lalu valid dan mengembalikan email dan kode token dengan metode POST", function (done) {
        chai.request(server)
            .post('/api/users/login')
            .send({
                email: "zoro@gmail.com",
                password: "1234567",
            }).end(function (err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('data');
                res.body.should.have.property('token');
                res.body.data.email.should.equal("zoro@gmail.com");
                res.body.token.should.equal(res.body.token);
                done();
            })
    })



    it("Seharusnya sistem memverifikasi token dan mengembalikan hasil verifikasi dengan metode POST", function (done) {
        chai.request(server)
            .post('/api/users/check')
            .send({
                token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InN1cnlhQGdtYWlsLmNvbSIsImlhdCI6MTU1MTU3MjM0MCwiZXhwIjoxNTUxNjU4NzQwfQ.B-ftnIRFrpgI8MnheD4weW3N2LtRVlRuLHhwySbDwPY",
            }).end(function (err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('valid');
                res.body.valid.should.equal(false);
                done();
            })
    })


    it("menghancurkan token dan mengembalikan nilai logout dengan metode GET", function (done) {
        chai.request(server)
            .get('/api/users/destroy')
            .end(function (err, res) {
                res.should.have.status(201);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('logout');
                res.body.logout.should.equal(true);
                done();
            })
    })
})
