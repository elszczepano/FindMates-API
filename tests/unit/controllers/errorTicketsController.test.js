import errorTicketsController from '../../../src/controllers/errorTicketsController';
import sinon from "sinon";
import {expect} from "chai";

let idStore= '';

describe('Test method getAll', () => {
    it('getAll should return an error', done => {
        const req = {
            query: {
                offset: 0,
                perPage: 10
            }
        };
        const res = {
            status: function () {
                return this;
            },
            json: sinon.spy()
        };
        errorTicketsController.getAll(req,res).then(() => {
            expect(res.json.firstCall.lastArg.success).to.equal(false);
            done();
        });
    });
    it('getAll should return all records', done => {
        const req = {
            body: {
                user: '5c308c78ce1c640bdc493942',
                message: 'lorem ipsum'
            },
            query: {
                offset: 0,
                perPage: 10
            }
        };
        const res = {
            status: function () {
                return this;
            },
            json: sinon.spy()
        };
        errorTicketsController.createNew(req,res).then(() => {
            errorTicketsController.getAll(req,res).then(() => {
                expect(res.json.firstCall.lastArg.success).to.equal(true);
                done();
            });
        });
    });
});

describe('Test method createNew', () => {
    it('createNew should return new record', done => {
        const req = {
            body: {
                user: '5c308c78ce1c640bdc493942',
                message: 'lorem ipsum'
            }
        };
        const res = {
            status: function () {
                return this;
            },
            json: sinon.spy()
        };
        errorTicketsController.createNew(req,res).then(() => {
            expect(res.json.firstCall.lastArg.success).to.equal(true);
            idStore = res.json.firstCall.lastArg.data._id;
            done();
        });
    });
});

describe('Test method getOne', () => {
    it('getOne should return an error', done => {
        const req = {
            params: {
                id: '5c308c78ce1c640bdc493942'
            }
        };
        const res = {
            status: function () {
                return this;
            },
            json: sinon.spy()
        };
        errorTicketsController.getOne(req,res).then(() => {
            expect(res.json.firstCall.lastArg.success).to.equal(false);
            done();
        });
    });
    it('getOne should return one records', done => {
        const req = {
            params: {
                id: idStore
            }
        };
        const res = {
            status: function () {
                return this;
            },
            json: sinon.spy()
        };
        errorTicketsController.getOne(req,res).then(() => {
            expect(res.json.firstCall.lastArg.success).to.equal(true);
            done();
        });
    });
});

