'use strict'

const chai = require('chai');
const chaiHTTP = require('chai-http');          // request testnya
const server = require('../app');

const Data = require('../models/data');
const should = chai.should();               // pengecekan


chai.use(chaiHTTP);



describe('data', function () {
    Data.collection.drop();

    beforeEach(function (done) {
        let data = new Data({
            letter: 'B',
            frequency: 2.2
        })
        data.save(function (err) {
            done();
        })
    })
    afterEach(function (done) {
        Data.collection.drop();
        done();
    })


    // ====================== search ========================
    it("Seharusnya sistem mengembalikan nilai letter dan frequency dengan metode POST", function (done) {
        chai.request(server)
            .post('/api/data/search')
            .send({
                letter: 'B',
                frequency: 2.2
            }).end(function (err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body[0].should.be.a('object');
                res.body[0].should.have.property('letter');
                res.body[0].should.have.property('frequency');
                res.body[0].letter.should.equal("B");
                res.body[0].frequency.should.equal(2.2);
                done();
            })
    })


    // ======================== read =============================
    it("Seharusnya sistem mengembalikan nilai letter dan frequency dengan metode GET", function (done) {
        chai.request(server)
            .get('/api/data')
            .send({
                letter: 'B',
                frequency: 2.2
            }).end(function (err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body[0].should.be.a('object');
                res.body[0].should.have.property('letter');
                res.body[0].should.have.property('frequency');
                res.body[0].letter.should.equal("B");
                res.body[0].frequency.should.equal(2.2);
                done();
            })
    })


    // ========================= edit =============================== 
    it("Seharusnya sistem mengembalikan berhasil mengubah data dengan metode PUT", function (done) {
        chai.request(server)
            .get('/api/data')
            .end(function (err, res) {
                chai.request(server)
                    .put('/api/data/' + res.body[0]._id)
                    .send({
                        letter: "B",
                        frequency: 2.22
                    }).end(function (error, res) {
                        res.should.have.status(200);
                        res.should.be.json;
                        res.body.should.be.a('object');
                        res.body.should.have.property('success');
                        res.body.should.have.property('message');
                        res.body.should.have.property('data');
                        res.body.success.should.equal(true);
                        res.body.message.should.equal("data have been updated");
                        res.body.data.letter.should.equal("B");
                        res.body.data.frequency.should.equal(2.22);
                        done();
                    })
            })
    })


    // =============================== add =====================
    it('seharusnya menambahkan satu data dengan metode POST', function (done) {
        chai.request(server)
            .post('/api/data')
            .send({
                letter: 'hello',
                frequency: 10.1
            }).end(function (err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('success');
                res.body.should.have.property('message');
                res.body.should.have.property('data');
                res.body.success.should.equal(true);
                res.body.message.should.equal("data have been added");
                res.body.data.letter.should.equal("hello");
                res.body.data.frequency.should.equal(10.1);
                done();
            })
    })




    // ================================== delete =============================
    it('seharusnya menghapus satu data berdasarkan id dengan metode DELETE', function (done) {
        chai.request(server)
            .get('/api/data')
            .end(function (err, res) {
                chai.request(server)
                    .delete('/api/data/' + res.body[0]._id)
                    .end(function (error, res) {
                        res.should.have.status(200);
                        res.should.be.json;
                        res.body.should.be.a('object');
                        res.body.should.have.property('status');
                        res.body.should.have.property('message');
                        res.body.should.have.property('data');
                        res.body.status.should.equal('success');
                        res.body.message.should.equal("data have been deleted");
                        res.body.data.letter.should.equal("B");
                        res.body.data.frequency.should.equal(2.2);
                        done();
                    })
            })
    })


    // =============================== find ==============================
    it('seharusnya menampilkan data berdasarkan id dengan metode GET', function (done) {
        chai.request(server)
            .get('/api/data')
            .end(function (err, res) {
                chai.request(server)
                    .get('/api/data/' + res.body[0]._id)
                    .end(function (error, res) {
                        res.should.have.status(200);
                        res.should.be.json;
                        res.body.should.be.a('object');
                        // console.log(res.body);
                        res.body.should.have.property('success');
                        res.body.should.have.property('message');
                        res.body.should.have.property('data');
                        res.body.success.should.equal(true);
                        res.body.message.should.equal("data found");
                        res.body.data.letter.should.equal("B");
                        res.body.data.frequency.should.equal(2.2);
                        done();
                    })
            })
    })
})

