'use strict'

const chai = require('chai');
const chaiHTTP = require('chai-http');
const server = require('../app');

const Datadate = require('../models/datadate');
const should = chai.should();

chai.use(chaiHTTP);

describe('datadate', () => {


    beforeEach((done) => {
        let datadate = new Datadate({
            letter: "2000-01-01",
            frequency: 100.0
        })
        datadate.save((err) => {
            done();
        })
    })

    afterEach((done) => {
        Datadate.collection.drop();
        done();
    })


    // =================================== search ====================================
    it("Seharusnya sistem mengembalikan datadate berdasarkan nilai letter yang dimasukan dengan metode POST", (done) => {
        chai.request(server)
            .post('/api/datadate/search')
            .send({
                letter: "2000-01-01"
            }).end((err, res) => {
                res.should.have.status(200);
                res.should.be.json;
                res.body[0].should.be.a('object');
                res.body[0].should.have.property('letter');
                res.body[0].should.have.property('frequency');
                res.body[0].letter.should.equal("2000-01-01");
                res.body[0].frequency.should.equal(100.0);
                done();
            })
    })


    // ================================= read ==================================
    it("Seharusnya sistem mengenbalikan datadate dengan metode GET", (done) => {
        chai.request(server)
            .get('/api/datadate')
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.json;
                res.body[0].should.be.a('object');
                res.body[0].should.have.property('letter');
                res.body[0].should.have.property('frequency');
                res.body[0].letter.should.equal("2000-01-01");
                res.body[0].frequency.should.equal(100.0);
                done();
            })
    })


    // ================================= edit =====================================
    it("Seharusnya sistem berhasil mengubah datadate dengan metode PUT", (done) => {
        chai.request(server)
            .get('/api/datadate')
            .end((err, res) => {
                chai.request(server)
                    .put('/api/datadate/' + res.body[0]._id)
                    .send({
                        letter: "2000-01-01",
                        frequency: 1.1
                    }).end((error, response) => {
                        response.should.have.status(200);
                        response.should.be.json;
                        response.body.should.be.a('object');
                        response.body.should.have.property('success');
                        response.body.should.have.property('message');
                        response.body.should.have.property('data');
                        response.body.success.should.equal(true);
                        response.body.message.should.equal("datadate has been updated");
                        response.body.data.letter.should.equal("2000-01-01");
                        response.body.data.frequency.should.equal(1.1);
                        done();
                    })
            })
    })


    // ================================== add ===============================
    it('seharusnya menambahkan satu datadate dengan metode POST', (done) => {
        chai.request(server)
            .post('/api/datadate')
            .send({
                letter: '2000-01-01',
                frequency: 1.1
            }).end((err, res) => {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('success');
                res.body.should.have.property('message');
                res.body.should.have.property('data');
                res.body.success.should.equal(true);
                res.body.message.should.equal("datadate has been added");
                res.body.data.letter.should.equal("2000-01-01");
                res.body.data.frequency.should.equal(1.1);
                done();
            })
    })


    // ===================================== delete =====================================
    it('seharusnya menghapus satu data berdasarkan id dengan metode DELETE', (done) => {
        chai.request(server)
            .get('/api/datadate')
            .end((err, res) => {
                chai.request(server)
                    .delete('/api/datadate/' + res.body[0]._id)
                    .end((error, res) => {
                        res.should.have.status(200);
                        res.should.be.json;
                        res.body.should.be.a('object');
                        res.body.should.have.property('status');
                        res.body.should.have.property('message');
                        res.body.should.have.property('data');
                        res.body.status.should.equal("success");
                        res.body.message.should.equal("datadate has been deleted");
                        res.body.data.letter.should.equal("2000-01-01");
                        res.body.data.frequency.should.equal(100.0);
                        done();
                    })
            })
    })


    // ================================= find =====================================
    it('seharusnya menampilkan datadate berdasarkan id dengan metode GET', (done) => {
        chai.request(server)
            .get('/api/datadate')
            .end((err, res) => {
                chai.request(server)
                    .get('/api/datadate/' + res.body[0]._id)
                    .end((error, response) => {
                        response.should.have.status(200);
                        response.should.be.json;
                        response.body.should.be.a('object');
                        response.body.should.have.property('success');
                        response.body.should.have.property('message');
                        response.body.should.have.property('data');
                        response.body.success.should.equal(true);
                        response.body.message.should.equal("datadate found");
                        response.body.data.letter.should.equal("2000-01-01");
                        response.body.data.frequency.should.equal(100.0);
                        done();
                    })
            })
    })
})
